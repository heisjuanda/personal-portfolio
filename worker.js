const VALID_PAGE_PATHS = new Set([
  "/",
  "/projects",
  "/projects/josh-wood-colour",
  "/projects/juandabot",
  "/projects/lambda-lang",
  "/projects/patitas-a-casa",
  "/projects/portfolio",
  "/projects/thesis",
]);

function normalizePath(pathname) {
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}

function isDocumentRequest(request) {
  return request.headers.get("Sec-Fetch-Mode") === "navigate"
    || request.headers.get("Accept")?.includes("text/html");
}

async function serveAppShell(request, env, status) {
  const indexUrl = new URL("/index.html", request.url);
  const indexResponse = await env.ASSETS.fetch(indexUrl);
  const headers = new Headers(indexResponse.headers);

  if (status === 404) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return new Response(request.method === "HEAD" ? null : indexResponse.body, {
    status,
    statusText: status === 404 ? "Not Found" : "OK",
    headers,
  });
}

export default {
  async fetch(request, env) {
    const method = request.method;
    const pathname = normalizePath(new URL(request.url).pathname);
    const isPageRequest = method === "GET" || method === "HEAD";

    if (isPageRequest && VALID_PAGE_PATHS.has(pathname)) {
      return serveAppShell(request, env, 200);
    }

    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404 || !isPageRequest || !isDocumentRequest(request)) {
      return assetResponse;
    }

    return serveAppShell(request, env, 404);
  },
};
