export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    resource: "https://www.virellisystems.com/mcp",
    authorization_servers: [
      "https://dev-2d3k443udiv58w5z.us.auth0.com/"
    ],
    scopes_supported: ["create:retell_demo"],
    resource_documentation: "https://www.virellisystems.com"
  });
}
