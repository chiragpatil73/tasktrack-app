# 📋 TaskTrack – A Simple Task Management App

TaskTrack is a full-stack task management application that allows users to **register**, **login**, **create**, **edit**, and **delete tasks**. This project is built with the **MERN stack** and styled with **custom CSS + Tailwind utility classes**.

---

## 🚀 Tech Stack

- **Frontend**: React, Axios, React Router, Toastify
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Styling**: TailwindCSS, Custom CSS
- **Testing Tool**: Postman
- **Deployment**: Not deployed yet (local only)

---

## 📁 Folder Structure

tasktrack/
├── client/ # React frontend
│ └── pages/
│ ├── Login.jsx
│ ├── Signup.jsx
│ └── Dashboard.jsx
│ └── styles/
│ ├── login.css
│ ├── signup.css
│ └── dashboard.css
├── server/ # Node.js backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── server.js
└── README.md # This file

---

## 🧠 Features

- 👤 User Registration & Login with JWT Auth
- 🔒 Protected Routes using Middleware
- ✅ Token stored in `localStorage`
- 📥 Create tasks
- 🔄 Update tasks
- ❌ Delete tasks
- 🧾 All actions tested via Postman and connected to MongoDB Atlas

---

## 🔧 Installation & Setup

### ⚙️ Prerequisites
- Node.js & npm installed
- MongoDB Atlas account
- GitHub account

---

### 📦 Backend Setup

1. Navigate to the server folder:

cd server
Install dependencies:

npm install
Create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend:

node server.js
🎨 Frontend Setup
Navigate to the client folder:

cd client
Install dependencies:

npm install
Start the React app:

npm start
🧪 Postman Collection
You can test all APIs using Postman.

🔐 Auth Routes
Method	Endpoint	Body
POST	/api/auth/register	{ name, email, password }
POST	/api/auth/login	{ email, password }

✅ Task Routes (Authenticated)
All below routes require a Bearer Token in headers:

Authorization: Bearer <your_token>
Method	Endpoint	Description
GET	/api/tasks	Fetch all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task

🔑 Token Notes
Login gives a token in response.

Save it in localStorage.

Use it in Postman or frontend API headers as:

Authorization: Bearer <token>
