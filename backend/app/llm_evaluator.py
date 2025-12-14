import os
import json
import re
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def clean_llm_json(text: str) -> dict:
    """
    Removes markdown code fences and parses JSON safely
    """
    # Remove ```json or ``` if present
    cleaned = re.sub(r"```json|```", "", text).strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        raise ValueError("LLM did not return valid JSON")


def llm_evaluate(repo_metadata: dict) -> dict:
    """
    Uses LLM to generate summary & improvement roadmap
    """

    prompt = f"""
You are an expert software architect and GitHub code reviewer.

Analyze the following GitHub repository metadata and return ONLY valid JSON
(no markdown, no explanations).

JSON FORMAT (strict):
{{
  "summary": "1-paragraph professional evaluation",
  "roadmap": [
    "Improvement 1",
    "Improvement 2",
    "Improvement 3"
  ]
}}

Repository metadata:
{json.dumps(repo_metadata, indent=2)}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a strict JSON-only response generator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    raw_output = response.choices[0].message.content

    # ✅ CLEAN + PARSE JSON
    return clean_llm_json(raw_output)
