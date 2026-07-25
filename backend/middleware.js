const path = require('path');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const User = require('./models/user');

const syncUser = async (req, res, next) => {
    if (!req.auth || !req.auth.userId) return next();
    try {
        let user = await User.findOne({ _id: req.auth.userId });
        if (!user) {
            const clerkUser = await require('@clerk/clerk-sdk-node').users.getUser(req.auth.userId);
            user = new User({
                _id: req.auth.userId,
                name: clerkUser.firstName || clerkUser.username || "User",
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                address: "N/A"
            });
            await user.save();
        }
    } catch(e) {
        console.error("Error syncing user:", e);
    }
    next();
};

const validate = [ClerkExpressRequireAuth(), syncUser];

const validateAdmin = [
    ClerkExpressRequireAuth(),
    syncUser,
    async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.auth.userId });
            if (user && user.isAdmin) {
                return next();
            }
            return res.status(401).json({ message: 'not admin' });
        } catch(e) {
            return res.status(401).json({ message: 'not admin' });
        }
    }
];

// Set up email transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.TRANSPORTER_EMAIL,
        pass: process.env.TRANSPORTER_KEY,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to mail server:', error);
    } else {
        console.log('Connected to mail server successfully');
    }
});

// Set up Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['png', 'jpeg', 'gif'], 
    },
});

// Initialize multer with Cloudinary storage
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images Only!')); 
        }
    },
});

function checkCloudinaryConnection() {
    cloudinary.api.ping((error, result) => {
        if (error) {
            console.error('Cloudinary connection failed:', error.message);
        } else {
            console.log('Cloudinary connected successfully:');
        }
    });
}

// Export middleware
module.exports = { validate, upload, transporter, checkCloudinaryConnection, validateAdmin };