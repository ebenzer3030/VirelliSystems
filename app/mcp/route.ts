import { McpServer, createMcpHandler } from "@modelcontextprotocol/server";
import * as z from "zod/v4";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = createMcpHandler(() => {
  const server = new McpServer({
    name: "virelli-retell-builder",
    version: "1.0.0",
  });

  server.registerTool(
    "create_retell_demo",
    {
      description: "Creates a new Virelli AI receptionist demo in Retell.",

      inputSchema: z.object({
        agent_name: z.string().min(1),
        voice_id: z.string().min(1),
        prompt: z.string().min(1),
        first_message: z.string().min(1),
      }),
    },

    async ({ agent_name, voice_id, prompt, first_message }) => {
      const retellKey = process.env.RETELL_API_KEY;

      if (!retellKey) {
        throw new Error("RETELL_API_KEY is not configured.");
      }

      // Create Retell LLM
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
            begin_message: first_message,
          }),
        }
      );

      if (!llmResponse.ok) {
        throw new Error(
          `Retell LLM creation failed: ${await llmResponse.text()}`
        );
      }

      const llm = await llmResponse.json();

      // Create Retell agent
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
        throw new Error(
          `Retell agent creation failed: ${await agentResponse.text()}`
        );
      }

      const agent = await agentResponse.json();

      return {
        content: [
          {
            type: "text" as const,
            text:
              `Virelli demo created successfully. ` +
              `Agent: ${agent_name}. ` +
              `Agent ID: ${agent.agent_id}. ` +
              `LLM ID: ${llm.llm_id}.`,
          },
        ],
      };
    }
  );

  return server;
});

export async function GET(request: Request) {
  return handler.fetch(request);
}

export async function POST(request: Request) {
  return handler.fetch(request);
}

export async function DELETE(request: Request) {
  return handler.fetch(request);
}
