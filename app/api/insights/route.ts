import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { applications } = await request.json();

    if (!applications || applications.length === 0) {
      return NextResponse.json({
        insights:
          "Add your first job application to get AI-powered insights about your job search.",
      });
    }

    // Build a summary to send to Claude
    const summary = {
      total: applications.length,
      wishlist: applications.filter(
        (a: { status: string }) => a.status === "wishlist",
      ).length,
      applied: applications.filter(
        (a: { status: string }) => a.status === "applied",
      ).length,
      interview: applications.filter(
        (a: { status: string }) => a.status === "interview",
      ).length,
      offer: applications.filter(
        (a: { status: string }) => a.status === "offer",
      ).length,
      rejected: applications.filter(
        (a: { status: string }) => a.status === "rejected",
      ).length,
      companies: applications.map(
        (a: { companyName: string; status: string; appliedDate: string }) => ({
          company: a.companyName,
          role: a.status,
          appliedDate: a.appliedDate,
        }),
      ),
    };

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are a career coach analysing someone's job search pipeline. 
          
Here is their current application data:
${JSON.stringify(summary, null, 2)}

Give 2-3 short, specific, actionable insights about their job search. Be direct and encouraging. 
Format as plain text with each insight on a new line starting with an emoji.
Keep the total response under 120 words.
Do not use headers or bullet points — just the insights.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    return NextResponse.json({ insights: content.text });
  } catch (error) {
    console.error("Insights error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 },
    );
  }
}
