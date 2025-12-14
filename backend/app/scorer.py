def calculate_score(a):
    score = 0

    score += min(a["commit_count"] * 2, 20)
    score += 15 if a["has_readme"] else 5
    score += 20 if a["has_tests"] else 5
    score += 10 if a["has_ci"] else 0
    score += min(len(a["languages"]) * 5, 15)

    return min(score, 100)
