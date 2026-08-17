import { Helmet } from "react-helmet-async";

const BASE_URL = "https://juandamoreno.dev";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-cover.webp`;
const DEFAULT_OG_IMAGE_ALT =
  "Juan David Moreno — Software Engineer Portfolio";

export default function SEOHead({
  title,
  description,
  canonical = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  ogSiteName = "Juan David Moreno Portfolio",
  ogLocale = "en_US",
  ogLocaleAlternate = "es_CO",
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} — Juan David Moreno`
    : "Juan David Moreno | Software Engineer in Colombia";

  const fullCanonical = `${BASE_URL}${canonical}`;
  const fullOgImage = new URL(ogImage, `${BASE_URL}/`).href;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      {!noIndex && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
    </Helmet>
  );
}
