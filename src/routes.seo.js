import { PROJECTS_DATA } from "./views/data/projects.data.js";

export const BASE_URL = "https://juandamoreno.dev";

const PERSON_ID = `${BASE_URL}/#person`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const PROFILE_PAGE_ID = `${BASE_URL}/#profile-page`;

/** Bump when the profile content itself meaningfully changes. */
const LAST_REVIEWED = "2026-08-27T00:00:00-05:00";

const HOME_DESCRIPTION =
  "Juan David Moreno Alfonso (heisjuanda) is a Full Stack Software Engineer at Truora, based in Cali, Colombia, building fast, creative web products worldwide.";

const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Juan David Moreno Alfonso",
  alternateName: [
    "Juan David Moreno",
    "Juanda",
    "Juanda Moreno",
    "heisjuanda",
    "soyjuandamoreno",
  ],
  // The site is written in English. These Spanish equivalents are metadata
  // only — they help Spanish-speaking searchers and AI assistants resolve
  // the same person, without translating or duplicating any page.
  jobTitle: [
    "Software Engineer",
    "Full Stack Software Engineer",
    "Creative Developer",
    "Ingeniero de Software",
    "Desarrollador Full Stack",
  ],
  description:
    "Full Stack Software Engineer based in Cali, Colombia, with more than four years of experience building web applications, cloud infrastructure, and reliable user interfaces. At Truora he works end-to-end on identity verification and fraud prevention products: full-stack features, REST APIs in Go, Android SDK components, and serverless workflows on AWS.",
  url: `${BASE_URL}/`,
  mainEntityOfPage: { "@id": PROFILE_PAGE_ID },
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/images/og-cover.jpg`,
    caption: "Juan David Moreno — Software Engineer",
  },
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
  workLocation: {
    "@type": "Place",
    name: "Cali, Valle del Cauca, Colombia",
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
    description:
      "Identity verification and fraud prevention platform for companies across Latin America.",
    sameAs: [
      "https://www.linkedin.com/company/truora/",
      "https://www.ycombinator.com/companies/truora",
    ],
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    occupationalCategory: "15-1252.00 Software Developers",
    occupationLocation: {
      "@type": "City",
      name: "Cali",
    },
    skills:
      "Full stack web development, identity verification and fraud prevention systems, REST API design in Go, serverless architecture on AWS, Android SDK development, frontend performance, motion design",
  },
  // alumniOf covers both education and past employers (schema.org allows
  // Organization here), which is how Cressco stays in the graph without
  // implying it is a current role.
  alumniOf: [
    // NOTE: confirm this matches your record before the next deploy.
    {
      "@type": "CollegeOrUniversity",
      name: "Universidad del Valle",
      alternateName: "Univalle",
      url: "https://www.univalle.edu.co/",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cali",
        addressRegion: "Valle del Cauca",
        addressCountry: "CO",
      },
    },
    {
      "@type": "Organization",
      name: "Cressco",
      url: "https://www.cressco.dev/",
      description:
        "Digital agency where he worked as a Software Developer on frontend architecture and infrastructure for healthcare and e-commerce clients.",
      sameAs: ["https://www.linkedin.com/company/cressco/"],
    },
  ],
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
  knowsLanguage: [
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Spanish", alternateName: "es" },
  ],
  knowsAbout: [
    "React",
    "JavaScript",
    "TypeScript",
    "Python",
    "Kotlin",
    "Go",
    "AWS Lambda",
    "Amazon DynamoDB",
    "Amazon CloudFront",
    "Terraform",
    "PostgreSQL",
    "Serverless Architecture",
    "Full Stack Development",
    "Frontend Engineering",
    "Web Performance",
    "Technical SEO",
    "Motion Design",
    "Retrieval-Augmented Generation",
    "Identity Verification",
    "Fraud Prevention",
    "REST API Design",
    "Android Development",
    "Edge Computing",
    "Data Labeling",
    "Email Deliverability",
  ],
};

const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "Juan David Moreno — Portfolio",
      alternateName: "juandamoreno.dev",
      url: `${BASE_URL}/`,
      description:
        "Personal portfolio of Juan David Moreno Alfonso, a Full Stack Software Engineer and Creative Developer based in Cali, Colombia.",
      inLanguage: "en",
      author: { "@id": PERSON_ID },
      creator: { "@id": PERSON_ID },
      copyrightHolder: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": PROFILE_PAGE_ID,
      name: "Juan David Moreno — Software Engineer in Colombia",
      url: `${BASE_URL}/`,
      description:
        "Professional profile and portfolio of Juan David Moreno Alfonso, Software Engineer at Truora working on identity verification and fraud prevention, with earlier agency work on frontend architecture and infrastructure.",
      inLanguage: "en",
      dateModified: LAST_REVIEWED,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
    },
  ],
};

function createProjectGraph(project, canonical, ogImage, title, description) {
  const sameAs = [project.links?.live, project.links?.repo].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        mainEntity: { "@id": `${canonical}#creative-work` },
        author: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Juan David Moreno",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.name,
            item: canonical,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${canonical}#creative-work`,
        name: project.name,
        description: project.seoDescription,
        url: canonical,
        image: ogImage,
        inLanguage: "en",
        author: {
          "@type": "Person",
          "@id": PERSON_ID,
          name: "Juan David Moreno Alfonso",
          url: `${BASE_URL}/`,
        },
        creator: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        dateCreated: project.year,
        genre: project.category,
        keywords: project.tags?.join(", "),
        ...(project.role && { creditText: `${project.role} — ${project.name}` }),
        ...(sameAs.length > 0 && { sameAs }),
      },
    ],
  };
}

const projectSeoRoutes = PROJECTS_DATA.map((project) => {
  const path = `/projects/${project.id}`;
  const canonical = `${BASE_URL}${path}`;
  const ogImage = new URL(project.realSrc, `${BASE_URL}/`).href;
  const title = `${project.name} — Juan David Moreno`;

  return [
    path,
    {
      title,
      description: project.seoDescription,
      canonical,
      canonicalPath: path,
      ogImage,
      ogImageAlt: `${project.name} project by Juan David Moreno`,
      jsonLd: createProjectGraph(
        project,
        canonical,
        ogImage,
        title,
        project.seoDescription,
      ),
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
        ogImage: `${BASE_URL}/images/og-cover.jpg`,
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
