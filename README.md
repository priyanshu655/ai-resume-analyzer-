<div align="center">

# 🤖 AI Resume Analyzer

### Bridge the gap between your resume and the job you want.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[**Live Demo**](#) · [**Report a Bug**](#) · [**Request a Feature**](#)

</div>

---

## 📌 Overview

The **AI Resume Analyzer** is a full-stack web application that helps job seekers understand exactly why their resume may not be clearing Applicant Tracking Systems (ATS). By leveraging the **Google Gemini Pro API**, it provides instant, data-driven feedback on how well a resume aligns with a specific Job Description — delivering a match score, keyword gap analysis, and actionable improvement tips.

> **Stop guessing. Start optimizing.**

---

## 💡 The Problem & The Solution

Countless qualified applicants are rejected before a human ever reads their resume — filtered out by ATS bots that scan for specific keywords and formatting patterns. Most candidates have no idea why.

This project was built to fix that:

- **Extract** — Converts unstructured PDF data into clean, searchable text using `pdf-parse`.
- **Analyze** — Uses an LLM to understand the *context* of your experience relative to the Job Description, going beyond simple keyword matching.
- **Action** — Delivers a concrete **Match Score (%)**, a keyword gap report, and specific, actionable suggestions to improve your resume's visibility.

---

## ✨ Core Features

| Feature | Description |
|---|---|
| 🧠 **AI-Powered Analysis** | Gemini Pro understands *context*, not just keywords — it evaluates experience relevance holistically. |
| 📄 **Smart PDF Parsing** | Seamlessly extracts text from uploaded resumes using `pdf-parse`. |
| 📊 **Structured Insights** | Returns a clean JSON response with a Match Score, found/missing keywords, and formatting advice. |
| 🕒 **History Tracking** | Logged-in users can revisit past analyses to track their resume's evolution over time. |
| 🔐 **Secure Auth** | Full JWT implementation ensures private data stays private. |
| ⚡ **Fast File Handling** | Multer with memory storage processes files instantly — no temp files cluttering the server. |

---

## 🛠️ Tech Stack

| Layer | Technology | Key Libraries |
|---|---|---|
| **Frontend** | React.js (Vite) | Axios, React Router, Tailwind CSS |
| **Backend** | Node.js / Express | JWT, Multer, pdf-parse |
| **Database** | MongoDB Atlas | Mongoose (ODM) |
| **AI Engine** | Google Gemini Pro | Generative AI SDK, LangChain (Optional) |

---

## 📂 Project Structure

```
ai-resume-analyzer/
├── client/                     # React + Vite Frontend
│   └── src/
│       ├── components/         # Reusable UI (Navbar, Loading states)
│       ├── pages/              # Dashboard, Login, Analysis Results
│       └── api/                # Axios instance & interceptors
│
├── server/                     # Express.js Backend
│   ├── controllers/            # Logic for Auth & AI Analysis
│   ├── models/                 # MongoDB Schemas (User, AnalysisHistory)
│   ├── routes/                 # API Endpoint definitions
│   └── services/              # AI Prompt logic & PDF processing
│
└── .env                        # Sensitive Keys (Gitignored)
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) (v18+)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account and connection string
- A [Gemini API Key](https://aistudio.google.com/app/apikey) from Google AI Studio

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

**2. Set up the Backend**

```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

**3. Set up the Frontend**

```bash
cd ../client
npm install
npm run dev
```

The app will be live at `http://localhost:5173`.

---

## 🛡️ Security & Performance

- **Environment Safety** — All API keys and secrets are managed via `.env` files and are never committed to version control.
- **Protected Routes** — React Router guards ensure only authenticated users can access the dashboard and analysis history.
- **File Handling** — Multer is configured with memory storage for fast, serverless file processing, keeping the server clean.

---

## 📈 Roadmap

- [ ] **Skill Heatmap** — Visualize where the candidate stands vs. industry standards for a given role.
- [ ] **ATS Optimization Mode** — Targeted tips to help resumes bypass automated filters.
- [ ] **Multi-Format Support** — Extend file upload support to `.docx` files.
- [ ] **Cover Letter Generator** — Auto-generate a tailored cover letter based on the resume + JD analysis.

---

## 👤 Author

**Priyanshu Patel** — Full Stack Developer (MERN + AI)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://your-portfolio.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

⭐ **If you found this project helpful, please consider giving it a star!** ⭐

</div>
