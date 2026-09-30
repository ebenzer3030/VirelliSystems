import {
  McpServer,
  createMcpHandler,
  requireBearerAuth,
  getOAuthProtectedResourceMetadataUrl,
  OAuthError,
  OAuthErrorCode,
  type AuthInfo,
  type OAuthTokenVerifier,
} from "@modelcontextprotocol/server";

import * as z from "zod/v4";
import { createRemoteJWKSet, jwtVerify } from "jose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MCP_RESOURCE = "https://www.virellisystems.com/mcp";
const AUTH0_ISSUER = "https://dev-2d3k443udiv58w5z.us.auth0.com/";
const REQUIRED_SCOPE = "create:retell_demo";

const JWKS = createRemoteJWKSet(
  new URL(`${AUTH0_ISSUER}.well-known/jwks.json`)
);

const verifier: OAuthTokenVerifier = {
  async verifyAccessToken(token: string): Promise<AuthInfo> {
    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: AUTH0_ISSUER,
        audience: MCP_RESOURCE,
        algorithms: ["RS256"],
      });

      if (!payload.exp) {
        throw new Error("Token has no expiration.");
      }

      const scopes =
        typeof payload.scope === "string"
          ? payload.scope.split(" ").filter(Boolean)
          : [];

      return {
        token,
        clientId: String(payload.azp ?? payload.sub ?? "unknown"),
        scopes,
        expiresAt: payload.exp,
      };
    } catch {
      throw new OAuthError(
        OAuthErrorCode.InvalidToken,
        "Invalid or expired access token."
      );
    }
  },
};

const gate = requireBearerAuth({
  verifier,
  requiredScopes: [REQUIRED_SCOPE],
  resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(
    new URL(MCP_RESOURCE)
  ),
});

const handler = createMcpHandler(() => {
  const server = new McpServer({
    name: "virelli-retell-builder",
    version: "1.0.0",
  });

  server.registerTool(
    "create_retell_demo",
    {
      description: "Creates and configures a new Virelli AI receptionist demo in Retell.",

      inputSchema: z.object({
        agent_name: z.string().min(1),
        voice_id: z.string().min(1),
        prompt: z.string().min(1),
        first_message: z.string().min(1),
      }),

 

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

async function secured(request: Request) {
  const auth = await gate(request);

  if (auth instanceof Response) {
    return auth;
  }

  return handler.fetch(request, {
    authInfo: auth,
  });
}

export async function GET(request: Request) {
  return secured(request);
}

export async function POST(request: Request) {
  return secured(request);
}

export async function DELETE(request: Request) {
  return secured(request);
}
