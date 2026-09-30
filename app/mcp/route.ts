import { NextRequest } from "next/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function createServer() {
  const server = new McpServer({
    name: "virelli-retell-builder",
    version: "1.0.0",
  });

  server.tool(
    "create_retell_demo",
    "Creates a new Virelli AI receptionist demo in Retell.",
    {
      agent_name: z.string().min(1),
      voice_id: z.string().min(1),
      prompt: z.string().min(1),
      first_message: z.string().min(1),
    },
    async ({ agent_name, voice_id, prompt, first_message }) => {
      const retellKey = process.env.RETELL_API_KEY;

      if (!retellKey) {
        throw new Error("RETELL_API_KEY is not configured.");
      }

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
            type: "text",
            text: `Demo created successfully. Agent: ${agent_name}. Agent ID: ${agent.agent_id}. LLM ID: ${llm.llm_id}.`,
          },
        ],
      };
    }
  );

  return server;
}

async function handler(req: NextRequest) {
  const server = createServer();

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  await server.connect(transport);

  return transport.handleRequest(req as any);
}

export { handler as GET, handler as POST, handler as DELETE };
