import { buildLlmsTxt } from "@/lib/seo/llms";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const text = await buildLlmsTxt();
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
