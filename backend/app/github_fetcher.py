import requests
import os

GITHUB_API = "https://api.github.com"

def fetch_repo_data(repo_url: str):
    owner, repo = repo_url.rstrip("/").split("/")[-2:]
    headers = {
        "Authorization": f"token {os.getenv('GITHUB_TOKEN')}"
    }

    commits = requests.get(
        f"{GITHUB_API}/repos/{owner}/{repo}/commits",
        headers=headers
    ).json()

    languages = requests.get(
        f"{GITHUB_API}/repos/{owner}/{repo}/languages",
        headers=headers
    ).json()

    return {
        "commits": commits,
        "languages": languages
    }
