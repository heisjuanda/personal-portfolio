import { useEffect } from "react";

const BASE_URL = "https://juandamoreno.dev";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-cover.jpg`;
const DEFAULT_OG_IMAGE_ALT =
  "Juan David Moreno — Software Engineer Portfolio";
const INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NOINDEX_ROBOTS = "noindex, nofollow";

function setContent(selector, value) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute("content", value);
}

export default function SEOHead({
  title,
  description,
  canonical = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} — Juan David Moreno`
    : "Juan David Moreno | Software Engineer in Colombia";
  const fullCanonical = `${BASE_URL}${canonical}`;
  const fullOgImage = new URL(ogImage, `${BASE_URL}/`).href;

  useEffect(() => {
    document.title = fullTitle;

    setContent('meta[name="title"]', fullTitle);
    setContent('meta[name="description"]', description);
    setContent('meta[name="robots"]', noIndex ? NOINDEX_ROBOTS : INDEX_ROBOTS);

    setContent('meta[property="og:title"]', fullTitle);
    setContent('meta[property="og:description"]', description);
    setContent('meta[property="og:url"]', fullCanonical);
    setContent('meta[property="og:image"]', fullOgImage);
    setContent('meta[property="og:image:alt"]', ogImageAlt);

    setContent('meta[name="twitter:title"]', fullTitle);
    setContent('meta[name="twitter:description"]', description);
    setContent('meta[name="twitter:url"]', fullCanonical);
    setContent('meta[name="twitter:image"]', fullOgImage);
    setContent('meta[name="twitter:image:alt"]', ogImageAlt);

    // A page that must not be indexed must not point at a canonical either:
    // the pair "noindex + canonical" is contradictory for crawlers.
    const canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (noIndex) {
      canonicalLink?.remove();
    } else if (canonicalLink) {
      canonicalLink.setAttribute("href", fullCanonical);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = fullCanonical;
      document.head.appendChild(link);
    }
  }, [fullTitle, description, fullCanonical, fullOgImage, ogImageAlt, noIndex]);

  return null;
}
