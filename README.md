
# Notes App with OTP-Based Authentication  

## Table of Contents  
- [About the Project](#about-the-project)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Folder Structure](#folder-structure)  


---

## About the Project  

This project is a full-stack application that allows users to sign up and log in using an OTP-based authentication system powered by **Nodemailer**. Upon successful account creation, users are redirected to a **Note-Taking Dashboard** where they can:  
- View their personalized notes  
- Add new notes  
- Delete existing notes  

The authentication is secured using **JWT (JSON Web Tokens)**. All API calls and data operations are performed using **Axios** in the frontend.  

---

## Features  

1. **Authentication**:  
   - OTP-based sign-up and sign-in with email verification using **Nodemailer**.  
   - Secured session management using **JWT**.  

2. **Notes Management**:  
   - Create, view, and delete personal notes.  
   - Notes are linked to authenticated users.  

3. **Frontend Context API**:  
   - **AuthContext** for managing user authentication.  
   - **NoteContext** for managing notes.  

4. **Responsive Design**:  
   - A clean, responsive UI developed using modern front-end tools.  

---

## Tech Stack  

### Backend:  
- **Node.js**  
- **Express.js**  
- **TypeScript**  
- **Nodemailer**  
- **JWT**  
- **MongoDB (with Mongoose)**  

### Frontend:  
- **React.js**  
- **Context API (AuthContext, NoteContext)**  
- **TypeScript**  
- **Axios**  

---

## Prerequisites  

Before starting, ensure you have the following installed:  
- **Node.js** (v14 or higher)  
- **npm** or **yarn**  
- **MongoDB** (running instance or cloud setup)  

---

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/notes-app.git  
   cd notes-app  
   ```  

2. Install backend dependencies:  
   ```bash  
   cd backend  
   npm install  
   ```  

3. Install frontend dependencies:  
   ```bash  
   cd frontend  
   npm install  
   ```  

4. Configure environment variables:  
   - Create a `.env` file in the `backend` folder with the following variables:  
     ```env  
     MONGO_URI=<your_mongodb_connection_string>  
     JWT_SECRET=<your_jwt_secret>  
     SMTP_HOST=<your_smtp_host>  
     SMTP_PORT=<your_smtp_port>  
     SMTP_USER=<your_smtp_user>  
     SMTP_PASS=<your_smtp_password>  
     ```  

---

## Usage  

### Backend:  
Start the backend server:  
```bash  
npx ts-node-dev src/server.ts  
```  

### Frontend:  
Start the React development server:  
```bash  
npm start  
```  

The backend will run on `http://localhost:5000`, and the frontend on `http://localhost:3000`.  

---

## API Endpoints  

### Authentication  
- **POST** `/auth/send-otp` - Create a new account (sends OTP).  
- **POST** `/auth/verify-otp` - Verify OTP and authenticate.  
 

### Notes  
- **GET** `/api/notes` - Retrieve all notes for the logged-in user.  
- **POST** `/api/notes/create` - Add a new note.  
- **DELETE** `/api/notes/:id` - Delete a note by ID.  

---

## Folder Structure  

### Backend  
```
backend/  
├── src/   
│   ├── controllers/    # Route handlers for authentication and notes  
│   ├── middleware/     # JWT authentication middleware  
│   ├── models/         # Mongoose schemas for User and Notes  
│   ├── routes/         # API routes  
│   ├── utils/          # Utility functions (e.g., OTP generator)  
│   └── server.ts       # Entry point for the backend server  
├── package.json  
└── tsconfig.json  
```  

### Frontend  
```
frontend/  
├── src/  
│   ├── components/     # React components for UI  
│   ├── context/        # AuthContext and NoteContext  
│   ├── pages/          # Signup, Login, and Dashboard pages    
│   ├── App.tsx         # Root component  
│   └── index.tsx       # Entry point for React  
├── package.json  
└── tsconfig.json  
```  

---


