// Cloudflare Pages Function for the homepage ("/") only.
// On the real domain, visitors see the "coming soon" splash page instead of
// the full homepage. The pages.dev address (and branch previews) keep the
// full homepage. To launch, set comingSoon to false in src/_data/site.json:
// /coming-soon/ stops being built and this falls through to the homepage.
// Add ?splash to any address (for example a branch preview) to test it.
const SPLASH_HOSTS = new Set(["onceuponaparkday.com", "www.onceuponaparkday.com"]);

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  const wantSplash = SPLASH_HOSTS.has(url.hostname) || url.searchParams.has("splash");
  if (!wantSplash || !["GET", "HEAD"].includes(request.method)) {
    return next();
  }
  const splash = await env.ASSETS.fetch(new Request(new URL("/coming-soon/", url), request));
  if (!splash.ok) return next();
  const res = new Response(splash.body, splash);
  res.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return res;
}
