import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { companyName, role, notes, location, salary } = await request.json();

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Write a professional, concise cover letter for the following job application.

Job details:
- Company: ${companyName}
- Role: ${role}
- Location: ${location || "Not specified"}
- Salary: ${salary || "Not specified"}
- Notes: ${notes || "None"}

The cover letter should:
- Be addressed "Dear Hiring Manager"
- Be 3 short paragraphs: why this company, what I bring, call to action
- Sound human, confident, and specific to this role
- NOT include placeholder text like [Your Name] — end with "Sincerely, [Your Name]" only
- Be ready to send with minimal editing

Write only the cover letter. No extra commentary.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    return NextResponse.json({ coverLetter: content.text });
  } catch (error) {
    console.error("Cover letter error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 },
    );
  }
}
