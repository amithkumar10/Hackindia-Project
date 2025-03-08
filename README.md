### **📌 MERN Stack Template**  

This is a **MERN (MongoDB, Express, React, Node.js) Template** with pre-configured dependencies for both **frontend and backend**. It includes **Tailwind CSS, Chakra UI, Axios, Nodemailer, and Bcrypt**, making it a perfect boilerplate for quickly setting up new projects.

---

## **📂 Folder Structure**
```
Root
│── 📁 Frontend   (React + Vite)
│── 📁 Backend    (Express + Node.js)
│── 📄 .env       (Environment variables)
│── 📄 README.md  (This file)
```

---

## **🚀 Technologies Used**
### **🖥️ Frontend (React + Vite)**
- **React Router DOM** – For navigation  
- **Tailwind CSS** – Utility-first CSS framework  
- **Chakra UI** – Component-based UI library  
- **Framer Motion** – Animations  
- **Axios** – HTTP requests  
- **React Icons** – Icon library  

### **🖥️ Backend (Express + Node.js)**
- **Express.js** – Backend framework  
- **MongoDB (Mongoose)** – NoSQL database  
- **JWT (jsonwebtoken)** – Authentication  
- **Nodemailer** – Email sending  
- **Bcrypt** – Password hashing  
- **Cookie Parser** – For handling cookies  
- **CORS** – Cross-origin resource sharing  
- **Dotenv** – Environment variable management  
- **Nodemon** – Auto-restart server  

---

## **📦 Installation & Setup**
### **🔹 1. Clone the Repository**
```bash
git clone <repo_url>
cd <project_folder>
```

### **🔹 2. Install Dependencies**
#### **For Backend**
```bash
cd backend
npm install
```
#### **For Frontend**
```bash
cd frontend
npm install
```

### **🔹 3. Set Up Environment Variables**
Create a `.env` file in the **root directory** with the following variables:
```
DATABASE_URL=mongodb+srv://<your_db_user>:<your_db_password>@<cluster_url>/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

---

## **🚀 Running the Project**
### **🔹 Start Backend**
```bash
cd backend
npm run dev
```
### **🔹 Start Frontend**
```bash
cd frontend
npm run dev
```
The frontend will start on **http://localhost:5173**  
The backend will start on **http://localhost:5000**  

---

## **🛠 Features**
✅ **Pre-configured UI** with **Tailwind CSS & Chakra UI**  
✅ **Ready-to-use authentication** with **JWT & Bcrypt**  
✅ **Email integration** using **Nodemailer**  
✅ **Clean folder structure** for scalability  
✅ **Axios setup** for easy API requests  
✅ **Mongoose integration** for MongoDB  

---

## **📌 Notes**
- Ensure **MongoDB Atlas** is set up and the **connection string** is correct in `.env`.
- **For email functionality**, use an **App Password** instead of your real password if using **Gmail**.

---

## **📜 License**
This project is **open-source**. Feel free to use it to build projects.
