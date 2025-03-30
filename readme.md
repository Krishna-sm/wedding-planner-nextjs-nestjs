![image](https://github.com/user-attachments/assets/9232f2d9-1854-41c3-9e1b-7d0079e7dfc7)

# Wedding Planner

A full-stack Wedding Planner application built using **Nest.js (Backend)** and **Next.js (Frontend)** with **MongoDB** as the database.

## 🛠 Tech Stack

### Backend:
- **Nest.js** - Scalable backend framework
- **MongoDB** - NoSQL database
- **Cloudinary** - Image Uploads
- **JWT Authentication**

### Frontend:
- **Next.js** - React-based frontend framework
- **ShadCN** & **Tailwind CSS** - UI Styling

---

## 📂 Project Setup

### Backend (Nest.js)
#### 1️⃣ Clone the repository
```sh
 git clone https://github.com/Krishna-sm/wedding-planner-nextjs-nestjs.git
 cd wedding-planner-nextjs-nestjs/backend
```

#### 2️⃣ Install dependencies
```sh
 npm install
```

#### 3️⃣ Create `.env` file in the backend root and add:
```
MONGO_URI=your_mongodb_uri
PORT=5000
JWT_AUTH=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SCREATE=your_cloudinary_api_secret
```

#### 4️⃣ Run the backend server
```sh
 npm run start:dev
```

---

### Frontend (Next.js)
#### 1️⃣ Move to the frontend directory
```sh
 cd ../frontend
```

#### 2️⃣ Install dependencies
```sh
 npm install
```

#### 3️⃣ Create `.env.local` file in the frontend root and add:
```
NEXT_PUBLIC_BASE_URI=http://localhost:3000/api/v1
```

#### 4️⃣ Run the frontend server
```sh
 npm run dev
```

---

## 🚀 Features
- User Authentication (Signup/Login)
- Role-Based Access (Admin, Vendor, Customer)
- Blog Management
- Vendor Services & Booking
- Cloudinary for Image Uploads

---

## 📺 Follow Me
[YouTube: CodeWithKrishna](https://www.youtube.com/@CodeWithKrishnaa)

Happy Coding! 🎉
