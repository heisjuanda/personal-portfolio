export const PROJECTS_DATA = [
  {
    // project card data
    id: "josh-wood-colour",
    name: "Josh Wood Colour",
    stack: "React • Shopify • Gatsby • E-commerce",
    realSrc: "images/projects/josh_wood_colour.avif",
    blueprintSrc: "images/projects/josh_wood_colour_blueprint.avif",

    // project details
    year: "2023",
    category: "E-commerce",
    tags: ["React", "Shopify", "Gatsby", "E-commerce"],
    role: "Full Stack Developer",
    context: "Premium haircare e-commerce platform",
    problem:
      "Customers needed a seamless way to discover, personalize, and purchase premium haircare products online.",
    solution:
      "A high-performance e-commerce experience built with React and Shopify, supporting product catalog management, secure checkout, subscriptions, discount codes, bundles, and customer-specific personalization.",
    highlights: [
      "Improved initial load performance by ~20% through frontend optimizations",
      "Enhanced Shopify campaign email deliverability and reduced automated messages being flagged as spam",
      "Led a responsive UX redesign to deliver a consistent shopping experience across mobile, tablet, and desktop",
    ],
    impact:
      "Delivered a high-performance, fully responsive e-commerce platform that improved load times by ~20% and elevated the brand's digital presence across mobile, tablet, and desktop.",
    metrics: [
      { value: "~20%", label: "Initial load performance gain" },
      { value: "x2", label: "Increases the campaign email deliverability" },
    ],

    // project resources
    image: null,
    logo: null,
    links: { live: "https://joshwoodcolour.com", repo: null },
    images: [],

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
    stack: "Python • AI Models • Telegram API",
    realSrc: "images/projects/juandabot.avif",
    blueprintSrc: "images/projects/juandabot_blueprint.avif",

    // project details
    year: "2025",
    category: "AI · Bot",
    tags: ["Python", "Telegram API", "OpenAI", "Ollama", "Groq", "n8n"],
    role: "Backend Developer · AI Engineer",
    context: "Conversational support tool for the thesis platform",
    problem:
      "Users needed a fast, Telegram-native way to navigate the AI platform, access the right modules, and resolve questions about the thesis without waiting for manual support.",
    solution:
      "A RAG-based conversational assistant built on the full thesis documentation, capable of answering contextual questions, guiding users through the platform, and providing instant support through Telegram.",
    highlights: [
      "Enabled users to get instant, contextual answers about the platform directly within Telegram",
      "24/7 contextual support through Telegram, reducing friction and wait times for users",
      "Reduced user friction by providing guided, conversational onboarding and support",
      "Designed a resilient inference architecture with Ollama as the primary backend and n8n-based fallback flows using OpenAI and Groq",
    ],
    impact:
      "A resilient, always-on Telegram assistant that eliminated wait times for platform support, providing users with instant contextual guidance through natural conversation.",
    metrics: [
      { value: "85%", label: "Students improved speaking confidence" },
      { value: "92%", label: "Participants with stronger debate coherence" },
      { value: "95%", label: "Positive usability feedback" },
    ],

    // project resources
    image: null,
    logo: null,
    links: {
      live: "https://t.me/juandabot",
      repo: "https://github.com/heisjuanda/Juan-Dabot",
    },
    images: [],
    designSystem: null,
  },
  {
    // project card data
    id: "lambda-lang",
    name: "Lambda Lang",
    stack: "Dr Racket • Research • Lambda Calculus",
    realSrc: "images/projects/lambda_lang.avif",
    blueprintSrc: "images/projects/lambda_lang_blueprint.avif",

    // project details
    year: "2023",
    category: "Programming Languages · Research",
    tags: ["Dr Racket", "Lambda Calculus", "Scheme"],
    role: "Language Designer · Researcher",
    context: "University programming languages course",
    problem:
      "Understanding lambda calculus by reading theory alone is abstract — building it forces real comprehension.",
    solution:
      "A minimal functional language with custom syntax, parser, evaluator and reduction rules built from scratch in Dr Racket.",
    highlights: [
      "A learning‑driven, experimental language project to see how programming languages really work behind the syntax",
      "Built a small functional language in Dr Racket to deeply understand parsing, evaluation, and lambda calculus logic",
      "Created a visual REPL that shows reductions step‑by‑step, turning abstract concepts into tangible execution",
    ],
    impact:
      "A from-scratch functional language built to deeply understand how programming languages work — from parsing to reduction — resulting in a visual REPL that makes abstract lambda calculus tangible.",
    metrics: null,

    // project resources
    image: null,
    logo: null,
    links: {
      live: null,
      repo: "https://github.com/heisjuanda/Program-language",
    },
    images: null,
    designSystem: null,
  },
  {
    // project card data
    id: "patitas-a-casa",
    name: "Patitas a Casa",
    stack: "React • PostgreSQL • Tailwind CSS",
    realSrc: "images/projects/patitas_a_casa.avif",
    blueprintSrc: "images/projects/patitas_a_casa_blueprint.avif",

    // project details
    year: "2023",
    category: "Social Impact · Web App",
    tags: ["Non-profit", "Adoption Platform", "Social Impact", "Community"],
    role: "Full Stack Developer · Co-founder",
    context: "Non-profit, community-driven project",
    problem:
      "Stray dogs in Argentina have very low adoption visibility — shelters rely on fragmented social media posts.",
    solution:
      "A centralized platform where shelters and individuals can post dogs available for adoption with location, photos and status tracking.",
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
    stack: "React • CSS • JavaScript",
    realSrc: "images/projects/portfolio.avif",
    blueprintSrc: "images/projects/portfolio_blueprint.avif",

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
      "A scrolling telling my story, my projects, and my skills through a highly crafted frontend experience",
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
    stack: "Fast API • Python • React • Academic Project",
    realSrc: "images/projects/thesis.avif",
    blueprintSrc: "images/projects/thesis_blueprint.avif",

    // project details
    year: "2025",
    category: "AI · Web App",
    tags: [
      "AI Integration",
      "Academic Research",
      "Speech Recognition",
      "Full Stack",
    ],
    role: "Full Stack Developer · Researcher",
    context: "Academic thesis project",
    problem:
      "Systems engineering students needed a practical way to improve communication and critical thinking skills to strengthen their academic and professional profile.",
    solution:
      "An interactive AI-powered platform with two learning modules: one for critical thinking through structured debates, and another for oratory through guided speech exercises, asynchronous evaluation, and personalized feedback.",
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
      live: null,
      repo: "https://github.com/heisjuanda/trabajo-de-grado-2",
    },
    images: null,
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
