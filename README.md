# 🚜 Tractor Enquiry Website

A comprehensive web application designed for browsing tractors, managing service requests, and handling customer enquiries. Built with a modern React frontend and a robust Node.js backend.

---

## 🚀 Features

### Frontend
- **Modern UI/UX**: Professional design using React, Tailwind CSS, and Framer Motion for smooth animations.
- **Tractor Showroom**: Browse available tractors with detailed specifications.
- **Service Requests**: Integrated service booking system.
- **Inquiry Management**: Easy-to-use contact and enquiry forms.
- **Admin Dashboard**: Secure admin area for managing tractors, services, and enquiries.
- **OTP Verification**: Secure login flow with email-based OTP verification.

### Backend
- **Custom Router**: A custom-built HTTP routing system for efficient API handling.
- **Supabase Integration**: Real-time database and storage powered by Supabase.
- **Email Notifications**: Automated email alerts for enquiries and OTPs via Nodemailer.
- **JWT Authentication**: Secure API endpoints protected by JSON Web Tokens.
- **Admin Management**: Dedicated routes for administrative tasks.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Routing**: React Router DOM

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Database**: [Supabase](https://supabase.com/)
- **Authentication**: JWT (JSON Web Token)
- **Mailing**: Nodemailer
- **Environment**: Dotenv

---

## 📂 Project Structure

```text
tractor-enquiry-website/
├── frontend/               # React Vite Application
│   ├── src/
│   │   ├── admin/          # Admin-only components and views
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── services/       # API interaction layer
│   │   └── App.jsx         # Routing and main entry
│   └── public/             # Static assets
└── backend/                # Node.js API
    ├── routes/             # API Route handlers
    ├── controllers/        # Business logic
    ├── middlewares/        # Auth and validation middlewares
    ├── utils/              # Helper functions (Router, Mailer)
    └── server.js           # Server entry point
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd tractor-enquiry-website
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_email
SMTP_PASS=your_smtp_password
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

### 4. Running the Application
**Start Backend:**
```bash
cd backend
node server.js
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/auth/login` | Initiate admin login (OTP) |
| **POST** | `/auth/verify` | Verify OTP and get JWT |
| **GET** | `/tractors` | Fetch all tractors |
| **POST** | `/enquiry` | Submit a new enquiry |
| **GET** | `/admin/enquiries` | Fetch all enquiries (Admin) |
| **POST** | `/admin/tractors` | Add a new tractor (Admin) |

---

## 📝 License
This project is licensed under the ISC License.
