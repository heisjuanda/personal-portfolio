import { SEO_ROUTES } from "./src/routes.seo.js";

const VALID_PAGE_PATHS = new Set(Object.keys(SEO_ROUTES));
const LEGACY_REDIRECTS = new Map([
  ["/projects/thesis-platform", "/projects/thesis"],
]);

function normalizePath(pathname) {
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}

function isDocumentRequest(request) {
  return request.headers.get("Sec-Fetch-Mode") === "navigate"
    || request.headers.get("Accept")?.includes("text/html");
}

function rewriteSeo(response, seo) {
  const setContent = (content) => ({
    element(element) {
      element.setAttribute("content", content);
    },
  });
  const jsonLd = JSON.stringify(seo.jsonLd).replaceAll("<", "\\u003c");

  return new HTMLRewriter()
    .on("title", {
      element(element) {
        element.setInnerContent(seo.title);
      },
    })
    .on('meta[name="title"]', setContent(seo.title))
    .on('meta[name="description"]', setContent(seo.description))
    .on('link[rel="canonical"]', {
      element(element) {
        element.setAttribute("href", seo.canonical);
      },
    })
    .on('meta[property="og:url"]', setContent(seo.canonical))
    .on('meta[property="og:title"]', setContent(seo.title))
    .on('meta[property="og:description"]', setContent(seo.description))
    .on('meta[property="og:image"]', setContent(seo.ogImage))
    .on('meta[property="og:image:alt"]', setContent(seo.ogImageAlt))
    .on('meta[name="twitter:url"]', setContent(seo.canonical))
    .on('meta[name="twitter:title"]', setContent(seo.title))
    .on('meta[name="twitter:description"]', setContent(seo.description))
    .on('meta[name="twitter:image"]', setContent(seo.ogImage))
    .on('meta[name="twitter:image:alt"]', setContent(seo.ogImageAlt))
    .on("head", {
      element(element) {
        element.append(
          `<script type="application/ld+json" data-rh="true">${jsonLd}</script>`,
          { html: true },
        );
      },
    })
    .transform(response);
}

async function serveAppShell(request, env, status, seo) {
  const indexUrl = new URL("/index.html", request.url);
  const indexResponse = await env.ASSETS.fetch(indexUrl);
  const headers = new Headers(indexResponse.headers);

  if (status === 404) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  const response = new Response(
    request.method === "HEAD" ? null : indexResponse.body,
    {
      status,
      statusText: status === 404 ? "Not Found" : "OK",
      headers,
    },
  );

  if (request.method === "HEAD" || !seo) {
    return response;
  }

  return rewriteSeo(response, seo);
}

export default {
  async fetch(request, env) {
    const method = request.method;
    const url = new URL(request.url);
    const pathname = normalizePath(url.pathname);
    const isPageRequest = method === "GET" || method === "HEAD";

    if (isPageRequest && pathname === "/projects") {
      return Response.redirect(new URL("/", url).href, 301);
    }

    if (isPageRequest && LEGACY_REDIRECTS.has(pathname)) {
      return Response.redirect(
        new URL(LEGACY_REDIRECTS.get(pathname), url).href,
        301,
      );
    }

    if (isPageRequest && VALID_PAGE_PATHS.has(pathname)) {
      return serveAppShell(request, env, 200, SEO_ROUTES[pathname]);
    }

    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404 || !isPageRequest || !isDocumentRequest(request)) {
      return assetResponse;
    }

    return serveAppShell(request, env, 404);
  },
};
