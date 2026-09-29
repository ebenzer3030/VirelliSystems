import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Protect the endpoint
    const auth = req.headers.get("authorization");

    if (auth !== `Bearer ${process.env.VIRELLI_API_SECRET}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      agent_name,
      voice_id,
      prompt,
      first_message
    } = body;

    if (!agent_name || !voice_id || !prompt) {
      return NextResponse.json(
        {
          error: "agent_name, voice_id and prompt are required"
        },
        { status: 400 }
      );
    }

    const retellKey = process.env.RETELL_API_KEY;

    if (!retellKey) {
      return NextResponse.json(
        { error: "RETELL_API_KEY is missing" },
        { status: 500 }
      );
    }

    // STEP 1 — Create Retell LLM
    const llmResponse = await fetch(
      "https://api.retellai.com/create-retell-llm",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${retellKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          general_prompt: prompt,
          begin_message:
            first_message ||
            "Hi, thanks for calling. How can I help you today?",
        }),
      }
    );

    if (!llmResponse.ok) {
      const error = await llmResponse.text();

      return NextResponse.json(
        {
          stage: "create_llm",
          error,
        },
        { status: llmResponse.status }
      );
    }

    const llm = await llmResponse.json();

    // STEP 2 — Create Retell voice agent
    const agentResponse = await fetch(
      "https://api.retellai.com/create-agent",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${retellKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_name,
          voice_id,
          response_engine: {
            type: "retell-llm",
            llm_id: llm.llm_id,
          },
        }),
      }
    );

    if (!agentResponse.ok) {
      const error = await agentResponse.text();

      return NextResponse.json(
        {
          stage: "create_agent",
          error,
        },
        { status: agentResponse.status }
      );
    }

    const agent = await agentResponse.json();

    return NextResponse.json({
      success: true,
      message: "Virelli demo created successfully.",
      agent_name,
      agent_id: agent.agent_id,
      llm_id: llm.llm_id,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Demo creation failed." },
      { status: 500 }
    );
  }
}
