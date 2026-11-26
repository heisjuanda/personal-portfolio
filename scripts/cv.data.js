import { getExperienceYears } from "../src/constants/constants.js";

/**
 * Structured CV data used to generate public/cv/cv.pdf.
 * Experience years are computed dynamically from CAREER_START_YEAR.
 */
export function getCvData() {
  const experienceYears = getExperienceYears();

  return {
    name: "JUAN DAVID MORENO ALFONSO",
    role: "Full Stack Software Engineer",
    contact: [
      { text: "Cali, Colombia" },
      { text: "+57 3172824995", link: "https://wa.me/573172824995" },
      { text: "heisjuanda@gmail.com", link: "mailto:heisjuanda@gmail.com" },
      { text: "juandamoreno.dev", link: "https://juandamoreno.dev/" },
      {
        text: "linkedin.com/in/juandamoreno",
        link: "https://www.linkedin.com/in/juandamoreno/",
      },
      { text: "github.com/heisjuanda", link: "https://github.com/heisjuanda" },
    ],
    summary:
      `Full Stack Software Engineer with ${experienceYears}+ years shipping production systems across frontend, backend, and AWS, combining solid engineering with a design-minded eye for polished UI, motion, and intuitive UX. Known for high ownership, meticulous attention to detail, and mentoring teammates while delivering reliable products for identity security and e-commerce.`,
    experience: [
      {
        role: "Software Engineer",
        company: "Truora",
        period: "May 2024 – Sep 2026",
        bullets: [
          [
            { text: "Cut manual review time per case by " },
            { text: "50% (60s to 30s)", bold: true },
            {
              text: " by redesigning the human-in-the-loop tool used for validations the ML models flag as uncertain, with no loss in decision quality.",
            },
          ],
          [
            {
              text: "Designed and shipped Labeling Review, a human-review tool that turns manual decisions into training data for Truora’s internal AI models; processed ",
            },
            { text: "369K documents", bold: true },
            { text: " for 131 clients with monthly active clients growing " },
            { text: "from 55 to 89 (+62%)", bold: true },
            { text: "." },
          ],
          [
            { text: "Raised Chilean driver’s license number extraction from " },
            { text: "0% to 76.7%", bold: true },
            { text: " using Gemini 3 Flash OCR and a structured prompt." },
          ],
          [
            {
              text: "Rebuilt OCR for Colombian driver’s licenses (inDrive): multi-category extraction went ",
            },
            { text: "from none to 91% of documents", bold: true },
            {
              text: ", reading per-category expiry dates in 84% with zero out-of-range values, and added RUNT validation of required categories.",
            },
          ],
          [
            {
              text: "Built the Android document validation flow for the identity verification SDK (v1), running at high volume for ",
            },
            { text: "Lulo Bank, Claro and Addi.", bold: true },
          ],
          [
            {
              text: "Led projects end to end and mentored interns; led ",
            },
            { text: "4", bold: true },
            { text: " engineering candidate interviews and shadowed " },
            { text: "3", bold: true },
            { text: " more." },
          ],
        ],
      },
      {
        role: "Software Developer",
        company: "Cressco",
        period: "Aug 2023 – Apr 2024",
        bullets: [
          [
            { text: "Improved initial page load " },
            { text: "by ~20%", bold: true },
            { text: " on " },
            {
              text: "joshwoodcolour.com",
              link: "https://juandamoreno.dev/projects/josh-wood-colour",
            },
            {
              text: ", a leading UK haircare e-commerce platform (React, Gatsby, Shopify), through bundle restructuring, lazy loading and technical SEO.",
            },
          ],
          [
            { text: "Raised marketing email deliverability " },
            { text: "by ~27%", bold: true },
            {
              text: " by auditing campaign templates and copy against Google’s sender guidelines.",
            },
          ],
          [
            {
              text: "Built auto-save for Reddocares babysitter onboarding, eliminating data loss on session timeouts and cutting form abandonment.",
            },
          ],
        ],
      },
      {
        role: "Freelance Software Developer",
        company: "Independent",
        period: "Jan 2022 – Aug 2023",
        bullets: [
          [
            {
              text: "Delivered web applications for university students, faculty and non-profit communities as a continuous stream of independent contracts, moving from Java to Angular and then React.",
            },
          ],
          [
            { text: "Led the frontend of " },
            {
              text: "Patitas a Casa",
              link: "https://juandamoreno.dev/projects/patitas-a-casa",
            },
            {
              text: ", a pet adoption platform (React, PostgreSQL, Tailwind) with location and breed filters plus shelter dashboards.",
            },
          ],
        ],
      },
    ],
    skills: [
      {
        label: "Languages",
        items: "Go · Python · Kotlin · Java · JavaScript · TypeScript",
      },
      {
        label: "Frontend",
        items:
          "React · Vue.js · Gatsby · GSAP · HTML/CSS · Web Performance · Technical SEO",
      },
      {
        label: "Backend & Data",
        items:
          "FastAPI · Node.js · REST APIs · Microservices · PostgreSQL · DynamoDB",
      },
      {
        label: "Cloud & DevOps",
        items:
          "AWS (Lambda, DynamoDB, API Gateway, CloudFront) · Terraform · Docker · CI/CD · Git",
      },
      {
        label: "Domain",
        items:
          "Identity Verification · Fraud Detection · OCR · AI/LLM Integration · Prompt Engineering",
      },
    ],
    projects: [
      [
        {
          text: "AI Speech & Debate Platform",
          bold: true,
          link: "https://juandamoreno.dev/projects/thesis",
        },
        {
          text: " (FastAPI, Python, React). Automated feedback for students on pacing, word choice and argument structure. 85% of test users improved speaking confidence, 95% usability score.",
        },
      ],
      [
        {
          text: "JuandaBot",
          bold: true,
          link: "https://juandamoreno.dev/projects/juandabot",
        },
        {
          text: " (Python, Telegram API, Ollama, OpenAI, n8n). RAG assistant over platform documentation, with local inference and automated cloud fallback. In production with 38 users.",
        },
      ],
      [
        {
          text: "Lambda Lang",
          bold: true,
          link: "https://juandamoreno.dev/projects/lambda-lang",
        },
        {
          text: " (Racket). Functional language built from scratch: custom grammar, parser, evaluator and a REPL that visualises each beta-reduction step.",
        },
      ],
    ],
    education: {
      period: "Jan 2020 – Dec 2025",
      institution: "Universidad del Valle",
      degree: "B.Sc. Software Engineering, Cali, Colombia",
    },
    languages:
      "Spanish (native) · English (professional working proficiency, daily written docs and code review) · Portuguese (elementary)",
  };
}
