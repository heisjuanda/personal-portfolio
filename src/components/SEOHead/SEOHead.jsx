import { Helmet } from "react-helmet-async";

const BASE_URL = "https://juandamoreno.dev";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-cover.webp`;

export default function SEOHead({
  title,
  description,
  canonical = "/",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} — Juan David Moreno`
    : "Juan David Moreno | Software Engineer & Creative Developer";

  const fullCanonical = `${BASE_URL}${canonical}`;

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
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
