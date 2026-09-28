import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.RETELL_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { connected: false, error: "RETELL_API_KEY is missing" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.retellai.com/list-agents", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.text();

      return NextResponse.json(
        {
          connected: false,
          status: response.status,
          error,
        },
        { status: response.status }
      );
    }

    const agents = await response.json();

    return NextResponse.json({
      connected: true,
      message: "Virelli is connected to Retell.",
      agentCount: Array.isArray(agents) ? agents.length : null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        error: "Retell connection test failed.",
      },
      { status: 500 }
    );
  }
}
