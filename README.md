# 🛡️ RateGuard Analytics - Backend

**RateGuard Analytics** is an AI-powered insurance analytics platform. This repository contains the **Node.js backend** that powers the frontend application by handling API requests, user authentication, file processing, and integration with **Google Gemini AI** for summarization, comparison, and chatbot responses.

## 🚀 Features

- 🔐 User Authentication (JWT)
- 📄 AI-based Policy Summarizer (Text & PDF)
- ⚖️ Policy Comparison using AI
- 💬 Insurance Chatbot (Gemini-powered)
- 🌟 Policy Review & Rating System
- 📦 Modular Express Architecture

## 🧠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **AI Integration:** Google Gemini Pro / Flash
- **File Handling:** Multer, pdf-lib
- **Hosting:** Render (for deployment)

## 📁 Folder Structure

backend/
│
├── controllers/ # Route logic for summarizer, comparator, chatbot, review, auth
├── models/ # Mongoose schemas (User, Review)
├── routes/ # All API routes
├── utils/ # Gemini API handler
├── .env # API keys and DB config (keep secret!)
├── server.js # Entry point
└── package.json # Dependencies

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Gemini API Key from [Google AI Studio](https://makersuite.google.com/)

### Environment Variables (`.env`)

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key


