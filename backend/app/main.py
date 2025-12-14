from dotenv import load_dotenv
load_dotenv()

import traceback
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.github_fetcher import fetch_repo_data
from app.repo_analyzer import analyze_repo
from app.scorer import calculate_score
from app.llm_evaluator import llm_evaluate


app = FastAPI(title="RepoMirror AI")


# Allow frontend (Next.js) access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
def analyze(repo_url: str):
    try:
        print("🔹 Repo URL received:", repo_url)

        # 1️⃣ Fetch GitHub repository data
        repo_data = fetch_repo_data(repo_url)
        print("🔹 GitHub data fetched")

        # 2️⃣ Analyze repository structure & activity
        analysis = analyze_repo(repo_data)
        print("🔹 Repository analyzed")

        # 3️⃣ Calculate numeric score
        score = calculate_score(analysis)
        print("🔹 Score calculated:", score)

        # 4️⃣ LLM-generated summary & roadmap
        feedback = llm_evaluate(analysis)
        print("🔹 LLM feedback generated")

        # 5️⃣ API response (frontend-ready)
        return {
            "score": score,
            "summary": feedback["summary"],
            "roadmap": feedback["roadmap"],
        }

    except Exception as e:
        print("\n❌ BACKEND ERROR TRACEBACK ❌")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
