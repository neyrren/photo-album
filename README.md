# 📸 Photo Album System - Modern Web Application

A full-stack photo album management system built with Next.js, Express.js, and MySQL. Upload, organize, and manage your photo collections with an intuitive, mobile-responsive interface.

## ✨ Features

### User Management
- 🔐 User registration and authentication with JWT
- 👤 Profile management
- 🔑 Password change functionality
- 🗑️ Account deletion

### Album Management
- 📚 Create, read, update, and delete albums
- 📝 Album descriptions and titles
- 📊 Photo count and storage stats
- 🔒 User-isolated albums (only see your own)

### Photo Management
- 📷 Batch upload (up to 50 files at once)
- 🎞️ Automatic organization by date
- 💾 Unique filename generation
- 🗑️ Single and batch photo deletion
- ⭐ Favorite/unfavorite photos
- 📅 Search photos by date range
- 🔍 Lightbox image preview

### User Experience
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern UI with gradients and smooth animations
- ⬆️ Drag-and-drop file upload
- 📊 Loading states and error messages
- 🔄 Real-time updates
- 🎯 Intuitive navigation

### Security
- 🔐 Password hashing with bcryptjs
- 🛡️ JWT token authentication (7-day expiry)
- ✅ Input validation on all endpoints
- 🚫 CORS protection
- ⚠️ Rate limiting (100 requests per 15 minutes)
- 🔒 User authorization checks

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MySQL (v5.7+)