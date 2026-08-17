import { PROJECTS_DATA } from "./views/data/projects.data.js";

export const BASE_URL = "https://juandamoreno.dev";

const PERSON_ID = `${BASE_URL}/#person`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const HOME_DESCRIPTION =
  "Juan David Moreno Alfonso (heisjuanda) is a Full Stack Software Engineer at Truora, based in Cali, Colombia, building fast, creative web products worldwide.";

const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Juan David Moreno Alfonso",
      alternateName: [
        "Juan David Moreno",
        "Juanda",
        "heisjuanda",
        "soyjuandamoreno",
      ],
      jobTitle: "Software Engineer & Creative Developer",
      description:
        "Full Stack Software Engineer based in Cali, Colombia, with more than four years of experience building web applications, cloud infrastructure, and reliable user interfaces.",
      url: `${BASE_URL}/`,
      image: `${BASE_URL}/images/og-cover.webp`,
      email: "mailto:heisjuanda@gmail.com",
      nationality: {
        "@type": "Country",
        name: "Colombia",
      },
      homeLocation: {
        "@type": "Place",
        name: "Cali, Colombia",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cali",
          addressRegion: "Valle del Cauca",
          addressCountry: "CO",
        },
      },
      worksFor: {
        "@type": "Organization",
        name: "Truora",
        url: "https://www.truora.com/",
      },
      sameAs: [
        "https://github.com/heisjuanda",
        "https://www.linkedin.com/in/juan-david-moreno-883a46233/",
        "https://www.instagram.com/soyjuandamoreno/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "personal",
        name: "WhatsApp",
        identifier: "@soyjuandamoreno",
        url: "https://wa.me/soyjuandamoreno",
        availableLanguage: ["English", "Spanish"],
      },
      knowsLanguage: ["English", "Spanish"],
      knowsAbout: [
        "React",
        "JavaScript",
        "TypeScript",
        "Python",
        "Kotlin",
        "AWS",
        "Full Stack Development",
        "Frontend Engineering",
        "Motion Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "Juan David Moreno — Portfolio",
      url: `${BASE_URL}/`,
      description:
        "Personal portfolio of Juan David Moreno Alfonso, a Full Stack Software Engineer and Creative Developer based in Cali, Colombia.",
      inLanguage: "en",
      author: {
        "@id": PERSON_ID,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profile-page`,
      name: "Juan David Moreno — Software Engineer in Colombia",
      url: `${BASE_URL}/`,
      description:
        "Professional profile and portfolio of Juan David Moreno Alfonso.",
      inLanguage: "en",
      dateModified: "2026-08-16T12:34:00-05:00",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      mainEntity: {
        "@id": PERSON_ID,
      },
    },
  ],
};

function createProjectSchema(project, canonical, ogImage) {
  const sameAs = [project.links?.live, project.links?.repo].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonical}#creative-work`,
    name: project.name,
    description: project.seoDescription,
    url: canonical,
    image: ogImage,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Juan David Moreno Alfonso",
      url: `${BASE_URL}/`,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    dateCreated: project.year,
    keywords: project.tags?.join(", "),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

const projectSeoRoutes = PROJECTS_DATA.map((project) => {
  const path = `/projects/${project.id}`;
  const canonical = `${BASE_URL}${path}`;
  const ogImage = new URL(project.realSrc, `${BASE_URL}/`).href;

  return [
    path,
    {
      title: `${project.name} — Juan David Moreno`,
      description: project.seoDescription,
      canonical,
      canonicalPath: path,
      ogImage,
      ogImageAlt: `${project.name} project by Juan David Moreno`,
      jsonLd: createProjectSchema(project, canonical, ogImage),
    },
  ];
});

export const SEO_ROUTES = Object.freeze(
  Object.fromEntries([
    [
      "/",
      {
        title: "Juan David Moreno | Software Engineer in Colombia",
        description: HOME_DESCRIPTION,
        canonical: `${BASE_URL}/`,
        canonicalPath: "/",
        ogImage: `${BASE_URL}/images/og-cover.webp`,
        ogImageAlt: "Juan David Moreno — Software Engineer Portfolio",
        jsonLd: profileSchema,
      },
    ],
    ...projectSeoRoutes,
  ]),
);

export function getSeoForPath(pathname) {
  return SEO_ROUTES[pathname];
}
