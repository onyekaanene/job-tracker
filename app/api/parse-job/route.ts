import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "No job description provided" },
        { status: 400 },
      );
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a job posting parser. Extract structured data from the job posting below.

Return ONLY a valid JSON object with exactly these fields:
{
  "companyName": "company name or empty string",
  "role": "job title or empty string",
  "salary": "salary range or empty string",
  "location": "location or Remote or empty string",
  "jobUrl": "job url if present or empty string",
  "notes": "a one sentence summary of the role"
}

Do not include any explanation, markdown, or extra text. Only return the JSON object.

Job posting:
${text}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Strip any accidental markdown fences
    const clean = content.text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Parse job error:", error);
    return NextResponse.json(
      { error: "Failed to parse job description" },
      { status: 500 },
    );
  }
}
