"use client";

import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | {
    score: number;
    summary: string;
    roadmap: string[];
  }>(null);

  const analyzeRepo = async () => {
    if (!repoUrl) {
      setError("Please enter a GitHub repository URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/analyze?repo_url=${encodeURIComponent(repoUrl)}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">RepoMirror AI</h1>
          <span className="text-sm text-gray-600">
            AI-powered GitHub insights
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h2 className="text-5xl font-extrabold mb-6 animate-fade-in">
          Understand Your GitHub Repo Instantly
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          RepoMirror AI analyzes any GitHub repository using real data and
          Large Language Models to give you a quality score, expert feedback,
          and a clear improvement roadmap.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "🔍 Smart Repo Analysis",
            desc: "Analyzes commits, languages, and structure using GitHub APIs."
          },
          {
            title: "🤖 AI Code Review",
            desc: "LLM reviews your project like a senior software engineer."
          },
          {
            title: "🚀 Actionable Roadmap",
            desc: "Clear steps to improve code quality and production readiness."
          }
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-6 hover:scale-105 transition-transform"
          >
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              "Paste GitHub Repo URL",
              "Fetch Real GitHub Data",
              "AI Evaluates the Project",
              "Get Score & Roadmap"
            ].map((step, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-md transition"
              >
                <div className="text-3xl font-bold mb-3">{i + 1}</div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYZER */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Analyze Your Repository
          </h3>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="https://github.com/user/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            />
            <button
              onClick={analyzeRepo}
              disabled={loading}
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {error && <p className="text-red-600 mb-3">{error}</p>}
          {loading && (
            <p className="text-gray-500 animate-pulse">
              🤖 AI is reviewing the repository...
            </p>
          )}

          {result && (
            <div className="mt-6 space-y-6">
              {/* Score */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Score</span>
                  <span className="font-bold">{result.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-black h-3 rounded-full"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="font-semibold mb-1">Summary</h4>
                <p className="text-gray-700">{result.summary}</p>
              </div>

              {/* Roadmap */}
              <div>
                <h4 className="font-semibold mb-1">Improvement Roadmap</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {result.roadmap.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <p className="text-sm">
          © 2025 RepoMirror AI · Built with FastAPI, Next.js & LLMs
        </p>
      </footer>
    </main>
  );
}
