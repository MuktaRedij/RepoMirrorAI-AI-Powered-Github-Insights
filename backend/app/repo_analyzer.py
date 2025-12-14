def analyze_repo(data):
    return {
        "commit_count": len(data["commits"]),
        "languages": list(data["languages"].keys()),
        "has_readme": True,
        "has_tests": False,
        "has_ci": False
    }
