# Job Portal App

A fully responsive job portal application built with **React**, **TypeScript**, and **Redux**, styled with **Ant Design** and **Bootstrap**, and powered by **Firebase** for backend services and data storage.

## Features

- 🧑‍💼 User roles: job seekers, recruiters and admin
- 🔐 Authentication using Firebase Auth
- 📝 Job creation and job application functionality
- 📄 Job listings with filtering and detailed job views
- ⚛️ State management using Redux
- 📦 Realtime data powered by Firebase Firestore
- 💅 UI built with Ant Design and Bootstrap
- 🚦 Routing with React Router

## Tech Stack

- **React** — Frontend library
- **TypeScript** — Type safety
- **Redux Toolkit** — State management
- **Firebase** — Authentication & Firestore database
- **React Router** — Client-side routing
- **Ant Design & Bootstrap** — UI libraries

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nadiia-dev/job_portal_app.git
cd job_portal_app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

Create a Firebase project and configure the following in a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the app locally

```bash
npm run dev
```

Your app will be available at http://localhost:5173.

## Deployment

This project is deployed via [Vercel](https://vercel.com/)
