import { BASE_URL, SEO_ROUTES } from "./src/routes.seo.js";

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

const NOT_FOUND_SEO = {
  title: "404 — Page Not Found — Juan David Moreno",
  description: "The page you are looking for does not exist.",
  canonical: null,
  noIndex: true,
  ogImage: `${SEO_ROUTES["/"].ogImage}`,
  ogImageAlt: SEO_ROUTES["/"].ogImageAlt,
  jsonLd: null,
};

function rewriteSeo(response, seo) {
  const setContent = (content) => ({
    element(element) {
      element.setAttribute("content", content);
    },
  });
  const robots = seo.noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const pageUrl = seo.canonical ?? `${BASE_URL}/`;

  const rewriter = new HTMLRewriter()
    .on("title", {
      element(element) {
        element.setInnerContent(seo.title);
      },
    })
    .on('meta[name="title"]', setContent(seo.title))
    .on('meta[name="description"]', setContent(seo.description))
    .on('meta[name="robots"]', setContent(robots))
    .on('link[rel="canonical"]', {
      element(element) {
        if (seo.canonical) element.setAttribute("href", seo.canonical);
        else element.remove();
      },
    })
    .on('meta[property="og:url"]', setContent(pageUrl))
    .on('meta[property="og:title"]', setContent(seo.title))
    .on('meta[property="og:description"]', setContent(seo.description))
    .on('meta[property="og:image"]', setContent(seo.ogImage))
    .on('meta[property="og:image:alt"]', setContent(seo.ogImageAlt))
    .on('meta[name="twitter:url"]', setContent(pageUrl))
    .on('meta[name="twitter:title"]', setContent(seo.title))
    .on('meta[name="twitter:description"]', setContent(seo.description))
    .on('meta[name="twitter:image"]', setContent(seo.ogImage))
    .on('meta[name="twitter:image:alt"]', setContent(seo.ogImageAlt));

  if (seo.jsonLd) {
    const jsonLd = JSON.stringify(seo.jsonLd).replaceAll("<", "\\u003c");
    rewriter.on("head", {
      element(element) {
        element.append(
          `<script type="application/ld+json">${jsonLd}</script>`,
          { html: true },
        );
      },
    });
  }

  return rewriter.transform(response);
}

function shellPathFor(status, seo) {
  if (status === 404 || !seo) return "/404";
  return seo.canonicalPath;
}

async function serveAppShell(request, env, status, seo) {
  const shellUrl = new URL(shellPathFor(status, seo), request.url);
  const indexResponse = await env.ASSETS.fetch(shellUrl);
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

  if (request.method === "HEAD") {
    return response;
  }

  return rewriteSeo(response, seo ?? NOT_FOUND_SEO);
}

export default {
  async fetch(request, env) {
    const method = request.method;
    const url = new URL(request.url);
    const pathname = normalizePath(url.pathname);
    const isPageRequest = method === "GET" || method === "HEAD";

    if (isPageRequest && url.pathname !== pathname && VALID_PAGE_PATHS.has(pathname)) {
      return Response.redirect(new URL(pathname + url.search, url).href, 301);
    }

    if (isPageRequest && pathname === "/projects") {
      return Response.redirect(new URL("/", url).href, 301);
    }

    if (isPageRequest && (pathname === "/404" || pathname === "/404.html")) {
      return serveAppShell(request, env, 404);
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
