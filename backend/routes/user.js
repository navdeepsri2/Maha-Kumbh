const express = require('express');
const router = express.Router();
const { validate, transporter, validateAdmin } = require('../middleware');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { promisify } = require("util");
require('dotenv').config();
const User = require('../models/user');
const OTP = require('../models/otp');
const { Item, Item2 } = require('../models/item');
const { Comment, Blog } = require('../models/blog');
const ContactUs = require('../models/contactus'); 



router.get('/profile', validate, async (req, res) => {
    try {
        const user = await User.findById(req.auth.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({
            user_id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        });
    } catch (e) {
        res.status(500).json({ message: 'Error getting profile' });
    }
});

router.get('/profile/:id', validate, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            user_id: req.params.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        });
    } catch (e) {
        console.log("Error in getting profile:", e);
        res.status(500).json({ message: 'Error in getting profile.' });
    }
});

router.post('/profile/:id', validate, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.send("No such user present");
        }
        await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name || user.name,
            phoneNumber: req.body.phoneNumber || user.phoneNumber,
            address : req.body.address || user.address,
        }, { new: true });
        res.json({ message: 'Profile Updated successfully' });
    } catch (e) {
        console.log('Error in update:', e);
        res.status(500).send('Error updating profile.');
    }
});
  

router.delete('/profile/:id', validate, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'No such user present' });
        }
        await Comment.deleteMany({ user_id: user._id });
        const blogs = await Blog.find({ author_id: user._id });
        const blogIds = blogs.map(blog => blog._id);
        await Comment.deleteMany({ parent_blog: { $in: blogIds } });
        await Blog.deleteMany({ author_id: user._id });
        await Item.deleteMany({ email :  user.email});        
        await Item2.deleteMany({ email : user.email});  
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'Account and related data deleted successfully' });
    } catch (e) {
        console.log('Error in delete:', e);
        res.status(500).json({ message: 'Error deleting account and related data.' });
    }
});





router.post('/submit-contactus', async (req, res) => {
    try {
      const { name, email, phoneNumber, message } = req.body;
  
      if (!name || !email || !phoneNumber || !message) {
        return res.status(400).send('All fields are required');
      }
  
      
      const newContact = new ContactUs({ name, email, phoneNumber, message });
      await newContact.save();
  
      console.log( newContact);
      res.status(200).send('Form submitted successfully');
    } catch (err) {
      console.error('Error submitting form:', err);
      res.status(500).send('Error saving form submission');
    }
  });

router.get('/contactus',async(req,res)=>{
    try{
        const items = await ContactUs.find();
        res.status(200).json(items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'An error occurred with contact us' });
    }
})

router.delete('/contactus/:id', async (req,res) => {
    try{
        const item = await ContactUs.findByIdAndDelete(req.params.id);
        if(!item){
            res.status(500).json({message : "contact us report not available"});
        }
        res.status(200).json({message : "contact us report deleted"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'An error occurred with deleting contact us' });
    }
})

router.get('/profile/:id/blogs',async(req,res) => {
    try{
        const user = await User.findById(req.params.id).populate('blogs');
        res.status(200).json(user.blogs);
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: 'An error occurred with contact us' });
    }
})

router.get('/profile/:id/comments',async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        .populate({
            path: 'comments', 
            populate: {
                path: 'parent_blog', 
                select: 'title image', 
            },
        });
        res.status(200).json(user.comments);
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: 'An error occurred with contact us' });
    }
})  

router.get('/users', validateAdmin, async (req,res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: 'An error occurred with users' });
    }
})

router.delete('/users/:id', validateAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'No such user present' });
        }
        await Comment.deleteMany({ user_id: user._id });
        const blogs = await Blog.find({ author_id: user._id });
        const blogIds = blogs.map(blog => blog._id);
        await Comment.deleteMany({ parent_blog: { $in: blogIds } });
        await Blog.deleteMany({ author_id: user._id });
        await Item.deleteMany({ email :  user.email});        
        await Item2.deleteMany({ email : user.email});        
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'Account deleted successfully' });
    } catch (e) {
        console.log('Error in delete:', e);
        res.status(500).json({ message: 'Error deleting account.' });
    }
});

module.exports = router;