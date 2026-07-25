# 🕉️ Maha Kumbh

<p align="center">
  <b>A comprehensive tourism & community web platform for the Kumbh Mela pilgrimage</b>
</p>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://frontend-ashy-sigma-55.vercel.app)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📖 About

**Maha Kumbh** is a full-stack tourism web application designed to guide pilgrims and tourists attending the Kumbh Mela — the world's largest religious gathering. The platform provides everything a visitor needs: travel guides, major attraction listings, a community blog, a lost & found system, and an AI-powered chatbot assistant.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏛️ **Major Attractions** | Explore key religious and cultural sites around Prayagraj |
| 📝 **Community Blogs** | Read and write travel experiences and tips |
| 🔍 **Lost & Found** | Report and search for lost items or people at the Mela |
| 🤖 **AI Chatbot** | Gemini-powered assistant for instant travel guidance |
| 👤 **User Profiles** | Sign up, manage your profile, and view your activity |
| 🔐 **Clerk Authentication** | Secure and modern authentication with Clerk |
| 📸 **Image Uploads** | Upload images via Cloudinary integration |
| 📬 **Contact & FAQ** | Get help and find answers to common questions |
| 🛡️ **Admin Panel** | Manage users, blogs, and claimed lost items |

---

## 🏗️ Tech Stack

### Frontend
- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Clerk React** — Authentication
- **React Helmet Async** — SEO meta tags
- **React Hot Toast** — Notifications
- **React Quill** — Rich text blog editor

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — Database
- **Clerk SDK** — Server-side authentication
- **Cloudinary** — Image storage and management
- **Nodemailer** — Email service (OTP, contact)
- **Google Gemini AI** — AI chatbot integration
- **Express Session + MongoStore** — Session management

---

## 📁 Project Structure

```
Maha-Kumbh/
├── frontend/               # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # All UI components
│   │   ├── context/        # React context (state management)
│   │   ├── bolgData/       # Static data (blogs, attractions, FAQs)
│   │   ├── css/            # Stylesheets
│   │   └── App.js          # Main app with routing
│   └── package.json
│
├── backend/                # Express API server
│   ├── routes/             # API routes (user, blog, lf, chatbot)
│   ├── models/             # Mongoose models
│   ├── middleware.js        # Custom middleware
│   ├── index.js            # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Clerk account
- Cloudinary account

### 1. Clone the repository
```bash
git clone https://github.com/navdeepsri2/Maha-Kumbh.git
cd Maha-Kumbh
```

### 2. Set up the Backend
```bash
cd backend
cp .env.example .env
# Fill in all values in .env
npm install
npm start
```

### 3. Set up the Frontend
```bash
cd frontend
npm install
npm start
```

The app will run at **http://localhost:3000**

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | Server port (default: 8080) |
| `SESSION_SECRET` | Express session secret key |
| `STORE_SECRET` | MongoStore encryption key |
| `CLERK_SECRET_KEY` | Clerk backend secret key |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET` | Cloudinary API secret |
| `GEMINI_API_KEY` | Google Gemini AI API key |
| `TRANSPORTER_EMAIL` | Gmail address for email sending |
| `TRANSPORTER_KEY` | Gmail app password |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `REACT_APP_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `REACT_APP_API_URI` | Backend server URL |

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| **Frontend** | [Vercel](https://vercel.com) |
| **Backend** | [Render](https://render.com) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| **Images** | [Cloudinary](https://cloudinary.com) |

**Live URL:** [https://frontend-ashy-sigma-55.vercel.app](https://frontend-ashy-sigma-55.vercel.app)

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">Made with ❤️ for the pilgrims of Maha Kumbh Mela</p>
