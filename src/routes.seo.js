import { LAST_MODIFIED } from "./build-info.js";
import { PROJECTS_DATA } from "./views/data/projects.data.js";
import PROJECT_IMAGES from "./views/data/projects.images.js";

const HERO_SIZES = "(max-width: 768px) 100vw, min(1100px, 92vw)";

function heroPreload(project) {
  const key = project.gallery?.[0]?.src;
  const entry = key && PROJECT_IMAGES[key];
  if (!entry) return { href: `/${project.realSrc}`, type: "image/avif" };
  const [id, name] = key.split("/");
  const file = (w) => `/images/projects/${id}/${name}-${w}.avif`;
  const preferred = entry.sizes.includes(1024) ? 1024 : entry.sizes.at(-1);
  return {
    href: file(preferred),
    type: "image/avif",
    srcset: entry.sizes.map((w) => `${file(w)} ${w}w`).join(", "),
    sizes: HERO_SIZES,
  };
}

export const BASE_URL = "https://juandamoreno.dev";

const PERSON_ID = `${BASE_URL}/#person`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const PROFILE_PAGE_ID = `${BASE_URL}/#profile-page`;
const UNIVALLE_ID = `${BASE_URL}/#univalle`;


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
    "juandamoreno",
  ],
  jobTitle: [
    "Software Engineer",
    "Full Stack Software Engineer",
    "Creative Developer",
    "Ingeniero de Software",
    "Desarrollador Full Stack",
  ],
  description:
    "Full Stack Software Engineer based in Cali, Colombia, with more than four years of experience building web applications, cloud infrastructure, and reliable user interfaces. At Truora he works end-to-end on identity verification and fraud prevention products: full-stack features, REST APIs in Go, Android SDK components, and serverless workflows on AWS. He also interviews engineering candidates and mentors interns.",
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
      "Full stack web development, identity verification and fraud prevention systems, REST API design in Go, serverless architecture on AWS, Android SDK development, frontend performance, motion design, technical interviewing, mentoring",
    responsibilities:
      "Leads projects end to end, interviews engineering candidates and mentors interns.",
  },
  alumniOf: [
    {
      "@type": "OrganizationRole",
      roleName: "Systems Engineering undergraduate",
      startDate: "2020",
      endDate: "2025",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        "@id": UNIVALLE_ID,
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
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Systems Engineering",
    alternateName: "Ingeniería de Sistemas",
    description:
      "Five-year undergraduate degree in Systems Engineering, completed 2020–2025.",
    credentialCategory: "degree",
    educationalLevel: "Undergraduate",
    recognizedBy: { "@id": UNIVALLE_ID },
  },
  sameAs: [
    "https://github.com/heisjuanda",
    "https://www.linkedin.com/in/juandamoreno/",
    "https://www.instagram.com/juanda.rar/",
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
    "Technical Interviewing",
    "Mentoring",
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
      name: "Juan David Moreno Alfonso — Software Engineer in Colombia",
      url: `${BASE_URL}/`,
      description:
        "Professional profile and portfolio of Juan David Moreno Alfonso, Software Engineer at Truora working on identity verification and fraud prevention, with earlier agency work on frontend architecture and infrastructure.",
      inLanguage: "en",
      dateModified: LAST_MODIFIED,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
    },
  ],
};

function galleryImageUrl(key) {
  const entry = PROJECT_IMAGES[key];
  if (!entry) return null;
  const [id, name] = key.split("/");
  return `${BASE_URL}/images/projects/${id}/${name}-${entry.sizes.at(-1)}.avif`;
}

export function projectImages(project) {
  const urls = (project.gallery ?? [])
    .map((figure) => galleryImageUrl(figure.src))
    .filter(Boolean);
  if (project.realSrc) urls.push(`${BASE_URL}/${project.realSrc}`);
  return [...new Set(urls)];
}

function createProjectGraph(project, canonical, ogImage, title, description) {
  const sameAs = [
    project.links?.live,
    project.links?.repo,
    project.links?.paper,
  ].filter(Boolean);
  const contributors = (project.team?.credits ?? []).map((credit) => ({
    "@type": "Person",
    name: credit.name,
    ...(credit.url && { url: credit.url }),
  }));

  const images = [ogImage, ...projectImages(project)].slice(0, 4);
  const languages = Object.values(project.stackGroups ?? {}).flat();

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
        mainEntity: { "@id": `${canonical}#article` },
        author: { "@id": PERSON_ID },
        datePublished: project.datePublished,
        dateModified: project.dateModified,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "Juan David Moreno — Portfolio",
        url: `${BASE_URL}/`,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Juan David Moreno Alfonso",
        url: `${BASE_URL}/`,
        jobTitle: "Full Stack Software Engineer",
        sameAs: [
          "https://github.com/heisjuanda",
          "https://www.linkedin.com/in/juandamoreno/",
        ],
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
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: project.title ?? project.name,
        name: project.name,
        ...(project.alternateName && { alternateName: project.alternateName }),
        description: project.seoDescription,
        url: canonical,
        mainEntityOfPage: { "@id": `${canonical}#webpage` },
        image: images,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        datePublished: project.datePublished,
        dateModified: project.dateModified,
        genre: project.category,
        keywords: project.tags?.join(", "),
        articleSection: "Case study",
        ...(project.role && { creditText: `${project.role} — ${project.name}` }),
        ...(contributors.length > 0 && { contributor: contributors }),
        ...(sameAs.length > 0 && { sameAs }),
        about: {
          "@type": "SoftwareSourceCode",
          name: project.name,
          description: project.seoDescription,
          ...(project.links?.repo && { codeRepository: project.links.repo }),
          ...(project.links?.live && { targetProduct: project.links.live }),
          ...(languages.length > 0 && { programmingLanguage: languages }),
          dateCreated: project.timeline?.start ?? project.year,
          author: { "@id": PERSON_ID },
        },
      },
    ],
  };
}

const projectSeoRoutes = PROJECTS_DATA.map((project) => {
  const path = `/projects/${project.id}`;
  const canonical = `${BASE_URL}${path}`;
  const ogImage = new URL(project.ogImage ?? project.realSrc, `${BASE_URL}/`)
    .href;
  const title = `${project.seoTitle ?? project.name} — Juan David Moreno`;

  return [
    path,
    {
      title,
      description: project.seoDescription,
      canonical,
      canonicalPath: path,
      heroImage: heroPreload(project),
      ogImage,
      ogImageAlt: `${project.name} project by Juan David Moreno`,
      ogType: "article",
      lastmod: project.dateModified,
      images: projectImages(project),
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
        title: "Juan David Moreno Alfonso | Software Engineer in Colombia",
        description: HOME_DESCRIPTION,
        canonical: `${BASE_URL}/`,
        canonicalPath: "/",
        ogImage: `${BASE_URL}/images/og-cover.jpg`,
        ogImageAlt: "Juan David Moreno — Software Engineer Portfolio",
        ogType: "website",
        lastmod: LAST_MODIFIED.slice(0, 10),
        images: PROJECTS_DATA.map((p) => `${BASE_URL}/${p.realSrc}`),
        jsonLd: profileSchema,
      },
    ],
    ...projectSeoRoutes,
  ]),
);

export function getSeoForPath(pathname) {
  return SEO_ROUTES[pathname];
}
