import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import {
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom";

import App from "./App.jsx";
import { routes } from "./routes.jsx";
import { BASE_URL } from "./routes.seo.js";

const handler = createStaticHandler(routes);

/**
 * Renders the markup that goes inside <div id="root"> for one URL.
 *
 * Only the body is produced here: the per-route <head> (title, description,
 * canonical, Open Graph, JSON-LD) is still written by worker.js at the edge,
 * so there is exactly one source of truth for it.
 *
 * `prerender` waits for every Suspense boundary (the lazy NotFound view) before
 * resolving, unlike renderToString.
 */
export async function render(pathname) {
  const request = new Request(new URL(pathname, `${BASE_URL}/`));
  const context = await handler.query(request);

  if (context instanceof Response) {
    throw new Error(
      `Route ${pathname} produced a redirect (${context.status}); nothing to pre-render.`,
    );
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  const { prelude } = await prerender(
    <StrictMode>
      <App router={router} staticContext={context} />
    </StrictMode>,
  );

  return new Response(prelude).text();
}
