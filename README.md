# RepoMirror-AI-AI-Powered-Github-Insights

# 🪞 RepoMirror AI  
### AI-Powered GitHub Repository Evaluation & Insights

RepoMirror AI is a full-stack web application that **analyzes any GitHub repository** and provides:

- 📊 A **quality score**
- 🧠 **AI-generated expert feedback**
- 🚀 A clear **improvement roadmap**

Built using **FastAPI, Next.js, GitHub API, and Large Language Models (LLMs)**.

---

## ✨ Features

- 🔍 **Real GitHub Analysis**  
  Fetches commits, languages, and repository metadata using GitHub APIs.

- 🤖 **LLM-Powered Code Review**  
  Uses a Large Language Model to interpret repository metrics like a **senior software engineer**.

- 📊 **Quality Scoring System**  
  Deterministic scoring based on repository activity and best practices.

- 🧠 **Explainable AI**  
  “Why this score?” modal explains the reasoning behind each evaluation.

- 🎨 **Modern UI**  
  Clean, responsive, colorful UI built with Next.js & Tailwind CSS.

---
## 🏗️ Architecture Overview

```text
Frontend (Next.js + Tailwind)
        ↓
FastAPI Backend
        ↓
GitHub API → Repo Analysis (Python)
        ↓
LLM (OpenAI API)
        ↓
Score + Summary + Roadmap
```
---

---

## 🤖 How AI (LLM) Is Used

RepoMirror AI uses an LLM **only where human-like reasoning is required**.

### The LLM is used to:
- Generate a **professional evaluation summary**
- Create a **step-by-step improvement roadmap**
- Explain **why a repository received its score**

### The LLM is NOT used for:
- Counting commits
- Fetching GitHub data
- Calculating numeric scores

This ensures:
- ✅ Accuracy  
- ✅ Transparency  
- ✅ Explainability  

---

## 🛠️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **FastAPI**
- **Python**
- **GitHub REST API**
- **OpenAI LLM API**

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/repomirror-ai.git
cd repomirror-ai
```
### 2️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```
Create a .env file inside backend/:
```env
OPENAI_API_KEY=your_openai_api_key
GITHUB_TOKEN=your_github_token
```
Run backend:
```bash
uvicorn app.main:app --reload
```
Backend runs at:
```cpp
http://127.0.0.1:8000
```
###3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at:
```arduino
http://localhost:3000
```
## 🧪 Example Usage

1. Open the web app  
2. Paste a GitHub repository URL:
```bash
https://github.com/username/repository
```






