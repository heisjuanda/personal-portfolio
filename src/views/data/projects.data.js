export const PROJECTS_DATA = [
  {
    // project card data
    id: "josh-wood-colour",
    name: "Josh Wood Colour",
    seoTitle: "Josh Wood Colour: Headless Shopify Store with Gatsby",
    stack: "Gatsby • React • Shopify • Storyblok",
    seoDescription:
      "Josh Wood Colour is a headless Shopify store built with Gatsby, React and Storyblok at Cressco: ~20% faster loads, responsive redesign and fixed email deliverability.",
    realSrc: "images/projects/josh_wood_colour.avif",
    blueprintSrc: "images/projects/josh_wood_colour_blueprint.avif",
    ogImage: "images/og/josh-wood-colour.jpg",

    // project details
    year: "2023",
    category: "E-commerce",
    tags: [
      "Gatsby",
      "React",
      "Shopify Storefront API",
      "Storyblok",
      "Netlify",
      "E-commerce",
      "Web Performance",
      "Email Deliverability",
    ],
    role: "Software Developer · Cressco (agency)",
    context:
      "Premium at-home hair colour e-commerce for a UK brand, delivered as agency work at Cressco",
    problem:
      "Josh Wood Colour sells premium at-home hair colour to customers who need guidance before buying. The store had to combine editorial content, a product-matching quiz, subscriptions and a fast checkout, while its initial load was slow and its campaign emails were landing in spam.",
    solution:
      "A headless storefront: Gatsby 5 and React render the site statically from Shopify (catalog, cart, checkout, subscriptions, discount codes and bundles) and Storyblok (editorial content), deployed on Netlify Edge behind Cloudflare. I worked on frontend performance, the responsive redesign and the email-sending infrastructure.",
    highlights: [
      "Improved initial load performance by ~20% through frontend optimizations on the Gatsby storefront",
      "Fixed campaign emails going to spam by cleaning up the sending reputation and rewriting the message templates",
      "Led a responsive UX redesign to deliver a consistent shopping experience across mobile, tablet and desktop",
    ],
    impact:
      "A faster, fully responsive headless storefront whose marketing emails reach the inbox again: ~20% quicker initial loads and a consistent shopping experience across mobile, tablet and desktop.",
    metrics: [
      { value: "~20%", label: "Initial load performance gain" },
      { value: "x2", label: "Campaign email deliverability" },
    ],

    // project resources
    image: null,
    logo: null,
    links: { live: "https://joshwoodcolour.com", repo: null },
    images: [],
    team: null,

    designSystem: {
      fonts: [],
      palette: [
        {
          hex: "#F6E3E8",
          name: "Blush Mist",
          role: "primary",
          usage: "Backgrounds & surfaces",
        },
        {
          hex: "#F9E4B8",
          name: "Warm Sand",
          role: "secondary",
          usage: "Cards & containers",
        },
        {
          hex: "#DF546F",
          name: "Coral Rose",
          role: "accent",
          usage: "CTAs & highlights",
        },
      ],
    },
  },
  {
    // project card data
    id: "juandabot",
    name: "Juanda Bot",
    seoTitle: "Juanda Bot: Telegram Assistant with Groq, Ollama & n8n",
    stack: "Python • Telegram API • Groq • n8n",
    seoDescription:
      "Juanda Bot is a Python Telegram assistant for an AI learning platform: a public Groq Llama 3 build on Render and a private n8n version with Ollama and cloud fallbacks.",
    realSrc: "images/projects/juandabot.avif",
    blueprintSrc: "images/projects/juandabot_blueprint.avif",
    ogImage: "images/og/juandabot.jpg",

    // project details
    year: "2025",
    category: "AI · Bot",
    tags: [
      "Python",
      "Telegram API",
      "python-telegram-bot",
      "Groq",
      "Llama 3",
      "Flask",
      "Render",
      "n8n",
      "Ollama",
      "OpenAI",
      "RAG",
    ],
    role: "Backend Developer · AI Engineer",
    context:
      "Conversational support companion for the thesis platform (Universidad del Valle)",
    problem:
      "Users needed a fast, Telegram-native way to navigate the AI platform, access the right modules, and resolve questions about the thesis without waiting for manual support.",
    solution:
      "A Telegram assistant with two builds. The public one (repo linked below) is a Python bot on python-telegram-bot and Flask/Gunicorn, deployed on Render, that answers with Groq's Llama 3 70B and exposes commands for the oratory and critical-thinking modules, a usability survey and a QR code to the web app. A private iteration replaces the direct SDK call with n8n workflows: a RAG step retrieves context from the thesis documentation, Ollama runs inference locally first, and the flow falls back automatically to OpenAI and Groq.",
    highlights: [
      "Instant, contextual answers about the platform directly inside Telegram, 24/7, with no manual support queue",
      "Commands for each learning module (/oratoria, /pensamiento), a Nielsen-heuristics usability survey (/encuesta) and a QR code to the web app (/start)",
      "Public build: python-telegram-bot + Flask on Render, answering with Groq Llama 3 70B for near-zero latency and cost",
      "Private build: n8n workflows with RAG over the thesis docs, Ollama as primary local inference and automatic fallbacks to OpenAI and Groq",
    ],
    impact:
      "A resilient, always-on Telegram assistant that eliminated wait times for platform support, providing users with instant contextual guidance through natural conversation.",
    metrics: [
      { value: "85%", label: "Students improved speaking confidence" },
      { value: "92%", label: "Participants with stronger debate coherence" },
      { value: "95%", label: "Positive usability feedback" },
    ],
    metricsNote:
      "Results measured on the thesis platform this bot supports, not on the bot itself.",

    // project resources
    image: null,
    logo: null,
    links: {
      live: "https://t.me/juandabot",
      repo: "https://github.com/heisjuanda/Juan-Dabot",
    },
    images: [],
    team: null,
    designSystem: null,
  },
  {
    // project card data
    id: "lambda-lang",
    name: "Lambda Lang",
    seoTitle: "Lambda Lang: Interpreter in Racket (EOPL)",
    stack: "Racket • EOPL • Interpreter Design",
    seoDescription:
      "Lambda Lang is a programming language and interpreter built in Racket with the EOPL approach: scanner, parser, AST and evaluator with procedures, objects and methods.",
    realSrc: "images/projects/lambda_lang.avif",
    blueprintSrc: "images/projects/lambda_lang_blueprint.avif",
    ogImage: "images/og/lambda-lang.jpg",

    // project details
    year: "2023",
    category: "Programming Languages · Research",
    tags: [
      "Racket",
      "EOPL",
      "Scheme",
      "Interpreter",
      "Parser",
      "AST",
      "Programming Languages",
      "Universidad del Valle",
    ],
    role: "Interpreter Developer · Team of 4",
    context:
      "Final project for Fundamentals of Programming Languages (FLP), Universidad del Valle, 2022–2023",
    problem:
      "Reading about how programming languages work is abstract. The course asked us to build one: a language with its own grammar, an interpreter that executes it, and a REPL to try it live.",
    solution:
      "A language and interpreter written in Racket with the EOPL toolkit (#lang eopl). sllgen generates the scanner and parser from the grammar; the evaluator walks the AST with environments that support variables, let and letrec, assignment, procedures, methods and objects with send, update and clone. A REPL prints the parsed AST next to each result, so you can see how every expression is understood before it runs.",
    highlights: [
      "Grammar to interpreter in one pipeline: sllgen scanner and parser, AST datatypes and an environment-based evaluator",
      "Objects, methods and clone semantics on top of a functional core with let, letrec, procedures and apply",
      "REPL that prints the AST for each expression, making parsing and evaluation visible instead of theoretical",
    ],
    impact:
      "A from-scratch language and interpreter that turned parsing, environments and evaluation into working code, with a REPL that shows the AST behind every expression.",
    metrics: null,

    // project resources
    image: null,
    logo: null,
    links: {
      live: null,
      repo: "https://github.com/heisjuanda/Program-language",
    },
    images: null,
    team: {
      size: 4,
      credits: [
        { name: "Valentina Cobo", role: "Co-author" },
        { name: "Paola Andrea Domínguez", role: "Co-author" },
        { name: "Juan Felipe Jaramillo", role: "Co-author" },
      ],
    },
    designSystem: null,
  },
  {
    // project card data
    id: "patitas-a-casa",
    name: "Patitas a Casa",
    seoTitle: "Patitas a Casa: Pet Adoption Platform in React & Node",
    stack: "React • TypeScript • Node • MongoDB",
    seoDescription:
      "Patitas a Casa is a volunteer pet adoption platform in Argentina: React, Vite and TypeScript frontend, Express and MongoDB API, centralizing adoption and lost-pet listings.",
    realSrc: "images/projects/patitas_a_casa.avif",
    blueprintSrc: "images/projects/patitas_a_casa_blueprint.avif",
    ogImage: "images/og/patitas-a-casa.jpg",

    // project details
    year: "2023",
    category: "Social Impact · Web App",
    tags: [
      "React",
      "Vite",
      "TypeScript",
      "CSS Modules",
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "Non-profit",
      "Adoption Platform",
    ],
    role: "Full Stack Developer · Co-founder",
    context:
      "Volunteer, community-driven non-profit project based in Mendoza, Argentina (2023–2024)",
    problem:
      "Stray dogs in Argentina have very low adoption visibility — shelters rely on fragmented social media posts.",
    solution:
      "A React, Vite and TypeScript frontend with CSS Modules and react-hook-form, backed by a Node/Express API in TypeScript with MongoDB (Mongoose), Cloudinary for pet photos and Brevo for email. Shelters and individuals publish dogs for adoption and lost-and-found reports with location, photos, search filters and status tracking. The team also explored a parallel .NET API.",
    highlights: [
      "Led the frontend implementation of the platform's core views and user flows",
      "Developed shelter-related views to improve visibility for organizations and their available dogs",
      "Debugged and refined existing frontend behavior to improve stability and consistency",
    ],
    impact:
      "A centralized adoption platform that replaced fragmented social media posts with a unified, accessible space for shelters and individuals — bringing more dogs closer to a home.",
    metrics: null,

    // project resources
    image: null,
    logo: null,
    links: {
      live: "https://patitas-a-casa-frontend.vercel.app/",
      repo: "https://github.com/adanj27/Patitas-a-casa",
    },
    images: null,
    team: {
      size: 10,
      credits: [
        { name: "LeoPaez", url: "https://github.com/LeoPaez" },
        { name: "adanj27", url: "https://github.com/adanj27" },
        { name: "Spai26", url: "https://github.com/Spai26" },
        { name: "mauricioMedinaHM", url: "https://github.com/mauricioMedinaHM" },
        { name: "Bynox4", url: "https://github.com/Bynox4" },
        { name: "augustobor", url: "https://github.com/augustobor" },
        { name: "rctoa", url: "https://github.com/rctoa" },
        { name: "lizardwine", url: "https://github.com/lizardwine" },
        { name: "leapereira", url: "https://github.com/leapereira" },
      ],
    },
    designSystem: {
      fonts: [],
      palette: [
        {
          hex: "#736153",
          name: "Warm Brown",
          role: "primary",
          usage: "Backgrounds & surfaces",
        },
        {
          hex: "#FDFBFA",
          name: "Light Cream",
          role: "secondary",
          usage: "Cards & containers",
        },
        {
          hex: "#DE341D",
          name: "Adoption Orange",
          role: "accent",
          usage: "CTAs & highlights",
        },
      ],
    },
  },
  {
    // project card data
    id: "portfolio",
    name: "My Portfolio",
    seoTitle: "React & GSAP Portfolio on Cloudflare Workers",
    stack: "React • CSS • JavaScript",
    seoDescription:
      "Juan David Moreno's React portfolio combines GSAP motion, accessible interactions and technical storytelling to showcase full-stack and frontend work.",
    realSrc: "images/projects/portfolio.avif",
    blueprintSrc: "images/projects/portfolio_blueprint.avif",
    ogImage: "images/og/portfolio.jpg",

    // project details
    year: "2026",
    category: "Frontend · Design",
    tags: [
      "Motion Design",
      "GSAP",
      "Bento Layout",
      "SplitText",
      "Micro-animations",
    ],
    role: "Designer · Frontend Developer",
    context: "Personal project",
    problem:
      "Most developer portfolios look like resumes. I wanted mine to feel like a creative piece.",
    solution:
      "A React and GSAP scrolling experience that tells my story, presents my projects and skills, and combines accessible interactions with carefully optimized motion.",
    highlights: [
      "Built a scrolling telling my story, my projects, and my skills through a highly crafted frontend experience",
      "Communicates who I am, what I build, and why I care about frontend craftsmanship and problem solving",
      "Implemented an interactive UI system that reflects my focus on frontend engineering, product thinking, and detail-oriented execution",
      "Built a motion-driven portfolio to present projects, skills, and personal brand through a highly crafted frontend experience",
    ],
    impact:
      "A scrolling experience that tells my story, my projects, and my skills through a highly crafted frontend experience — communicating both technical depth and design sensibility.",
    metrics: null,

    // project resources
    image: null,
    logo: null,
    links: { live: "https://juandamoreno.dev", repo: null },
    images: null,
    team: null,
    designSystem: {
      fonts: [],
      palette: [
        {
          hex: "#EBE8DD",
          name: "Drafting Cream",
          role: "primary",
          usage: "Backgrounds & surfaces",
        },
        {
          hex: "#285C82",
          name: "Blueprint Blue",
          role: "secondary",
          usage: "borders & structural elements",
        },
        {
          hex: "#A98055",
          name: "Kraft Paper",
          role: "accent",
          usage: "CTAs, highlights & interactive notes",
        },
      ],
    },
  },
  {
    // project card data
    id: "thesis",
    name: "My Thesis",
    seoTitle: "AI Oratory & Debate Training Platform (Univalle Thesis)",
    alternateName:
      "Creación de módulos interactivos para el desarrollo continuo de la oratoria y el pensamiento crítico en el prototipo de enseñanza de habilidades blandas",
    stack: "FastAPI • Python • React • Groq",
    seoDescription:
      "Undergraduate thesis at Universidad del Valle: an AI platform built with FastAPI, React, Whisper and Llama 3 that trains oratory and critical thinking, with 95% usability approval.",
    realSrc: "images/projects/thesis.avif",
    blueprintSrc: "images/projects/thesis_blueprint.avif",
    ogImage: "images/og/thesis.jpg",

    // project details
    year: "2025",
    category: "AI · Web App",
    tags: [
      "FastAPI",
      "Python",
      "React",
      "PostgreSQL",
      "Whisper",
      "Groq",
      "Llama 3",
      "GPT-4o mini",
      "Auth0",
      "Speech Recognition",
      "Academic Research",
    ],
    role: "Full Stack Developer · Researcher",
    context:
      "Undergraduate thesis in Systems Engineering, Universidad del Valle (2025), built on the soft-skills platform started by Juan Azcárate",
    problem:
      "Systems engineering students needed a practical way to improve communication and critical thinking skills to strengthen their academic and professional profile.",
    solution:
      "A FastAPI and React platform with modules for oratory, critical thinking and debate. Speech exercises are recorded in the browser, transcribed with Whisper through Groq and evaluated asynchronously; Groq's Llama 3.3 70B and OpenAI's GPT-4o mini generate the debate topics and structured, personalized feedback. PostgreSQL stores progress and Auth0 handles sign-in.",
    highlights: [
      "Built two complete learning modules focused on oratory and critical thinking, from UX to AI integration",
      "Improved speaking confidence, with 85% of students reporting a noticeable increase after using the platform",
      "Strengthened argument structure, with 92% of participants showing better coherence in debate responses",
      "Achieved 95% positive feedback in usability tests, confirming the platform's value for communication training",
    ],
    impact:
      "An end-to-end AI learning platform that achieved 95% usability approval and measurably improved both oratory confidence and argument coherence in systems engineering students.",
    metrics: [
      { value: "85%", label: "Students improved speaking confidence" },
      { value: "92%", label: "Participants with stronger debate coherence" },
      { value: "95%", label: "Positive usability feedback" },
    ],

    // project resources
    image: null,
    logo: null,
    links: {
      live: "https://trabajo-de-grado-2-front.vercel.app/",
      repo: "https://github.com/heisjuanda/trabajo-de-grado-2",
      paper: "https://hdl.handle.net/10893/39431",
    },
    images: null,
    team: {
      size: 2,
      credits: [
        {
          name: "Juan Azcárate",
          role: "Base platform author",
          url: "https://github.com/azcaratejuan",
        },
        { name: "Joshua David Triana Madrid", role: "Thesis advisor" },
      ],
    },
    designSystem: {
      fonts: [],
      palette: [
        {
          hex: "#ffffff",
          name: "Clean White",
          role: "primary",
          usage: "Backgrounds & surfaces",
        },
        {
          hex: "#000000",
          name: "Deep Black",
          role: "neutral",
          usage: "Body text & borders",
        },
        {
          hex: "#61dafb",
          name: "React Blue",
          role: "accent",
          usage: "Interactive elements & brand",
        },
      ],
    },
  },
];
