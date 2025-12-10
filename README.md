# Doctor Appointment Management System (MERN Stack)

## Project Overview

This is a comprehensive, full-stack web application designed to manage the scheduling, departments, and user roles within a modern medical facility. Built on the **MERN** (MongoDB, Express, React, Node) stack and leveraging **TypeScript** for robust code quality, it features mandatory **Role-Based Access Control (RBAC)** to provide secure, tailored dashboards for Administrators, Doctors, and Patients.

---

## Key Features

### Core Security & Access
* **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for Admin, Doctor, and Patient roles, ensuring secure data handling.
* **Authentication:** Secure registration and login using **JWT (JSON Web Tokens)** managed by `jsonwebtoken` and `jwt-decode`.
* **Password Hashing:** Implemented secure password storage using `bcryptjs`.

### Core Functionality
* **Department Management:** Full CRUD (Create, Read, Update, Delete) functionality for managing specialties (e.g., Cardiology, Neurology). Images are handled via `multer`.
* **Appointment Scheduling:** Intuitive interface for patients to book appointments based on doctor availability.
* **Data Validation:** Utilizes `react-hook-form` with `yup` and `@hookform/resolvers` for clear, client-side validation.
* **State Management:** Local state and context for managing user authentication and application status.

### Design & UX
* **Modern UI:** Clean, responsive interface built with **Tailwind CSS** and **daisyUI** components.
* **Toasts:** User feedback via `react-toastify` for successful operations and errors.
* **Slider Components:** Uses `react-slick` for displaying dynamic content or doctor profiles.

---

## Technology Stack

This project is divided into two main components: `frontend/` (React/Vite) and `backend/` (Node/Express).

### Frontend (`doctor-appointments/`)
* **Framework:** React (using Vite as the build tool)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, PostCSS, **daisyUI**
* **Routing:** `react-router-dom` (v7)
* **Form Management:** `react-hook-form`, `yup`
* **HTTP:** `axios`

### Backend (`backend/`)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript (using `ts-node-dev` for development)
* **Database:** MongoDB via **Mongoose** (v9.0.0)
* **Middleware:** `cors`, `multer` (for file uploads)
* **Security:** `jsonwebtoken`, `bcryptjs`

---

## Installation and Setup

Follow these steps to get the project running locally.

### Prerequisites

* Node.js (v18+)
* MongoDB (local instance or cloud service like MongoDB Atlas)
* Git

### 1. Clone the Repository

```bash
git clone [https://github.com/Mahmoud123Jamal/Doctor-Appointment-MERN-App.git](https://github.com/Mahmoud123Jamal/Doctor-Appointment-MERN-App.git)
cd Doctor-Appointment-MERN-App
