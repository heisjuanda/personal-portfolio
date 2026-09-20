/**
 * Project case studies.
 *
 * Field guide (every field is optional unless the card needs it):
 *   name          short label used on the home card, breadcrumbs and related links
 *   title         descriptive h1 for the detail page; falls back to `name`
 *   nickname      informal name shown as a small stamp next to the title
 *   timeline      { start: "YYYY-MM" | "YYYY", end: "YYYY-MM" | "YYYY" | null }  null end = present
 *   status        "live" | "archived" | "prototype"
 *   org           { name, url?, client? }  who the work was for
 *   stackGroups   { <layer>: [chips] }  rendered as grouped chips in the spec block
 *   constraints   what limited the work (time, team, budget, legacy)
 *   decisions     [{ title, why, alternative? }]  engineering decisions with the rejected option
 *   learnings     short takeaways
 *   metrics       [{ value, label, context? }]  context = n, method or source
 *   metricsNote   caption under the metrics when they need a caveat
 *   related       ids of curated related case studies
 *   links         { live, liveLabel?, repo, paper }
 *   order         position on the home list (1 = first)
 *   hook          one line under the name on the home card: what it is and the payoff (≤ 70 chars)
 */
export const PROJECTS_DATA = [
  {
    // project card data
    id: "josh-wood-colour",
    name: "Josh Wood Colour",
    order: 3,
    hook: "Headless Shopify store made ~20% faster for a UK brand",
    title: "Josh Wood Colour: a headless Shopify storefront rebuilt with Gatsby 5 and Storyblok",
    seoTitle: "Headless Shopify Store with Gatsby & Storyblok: Case Study",
    stack: "Gatsby • React • Shopify • Storyblok",
    seoDescription:
      "Case study: headless Shopify store built with Gatsby 5, React and Storyblok at Cressco. ~20% faster first load and campaign emails back in the inbox.",
    realSrc: "images/projects/josh_wood_colour.avif",
    blueprintSrc: "images/projects/josh_wood_colour_blueprint.avif",
    ogImage: "images/og/josh-wood-colour.jpg",

    // project details
    year: "2023",
    timeline: { start: "2023", end: "2023" },
    status: "live",
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
    org: {
      name: "Cressco",
      url: "https://www.cressco.dev/",
      client: "Josh Wood Colour (UK)",
    },
    context:
      "Premium at-home hair colour e-commerce for a UK brand, delivered as agency work at Cressco",
    stackGroups: {
      frontend: ["Gatsby 5", "React"],
      commerce: ["Shopify Storefront API", "Storyblok CMS"],
      infra: ["Netlify Edge", "Cloudflare"],
    },
    problem:
      "Josh Wood Colour sells premium at-home hair colour to customers who need guidance before buying. The store had to combine editorial content, a product-matching quiz, subscriptions and a fast checkout, while its initial load was slow and its campaign emails were landing in spam.",
    solution:
      "A headless storefront: Gatsby 5 and React render the site statically from Shopify (catalog, cart, checkout, subscriptions, discount codes and bundles) and Storyblok (editorial content), deployed on Netlify Edge behind Cloudflare. I worked on frontend performance, the responsive redesign and the email-sending infrastructure.",
    constraints: [
      "A live store with real revenue: every change had to ship without downtime",
      "Brand and editorial guidelines owned by the client",
      "Agency timelines shared with other client work",
    ],
    decisions: [
      {
        title: "Josh Wood Colour: a headless Shopify storefront rebuilt with Gatsby 5 and Storyblok",
        why: "A rewrite would have frozen the store for weeks. Targeted frontend optimizations delivered the faster initial load with zero downtime.",
        alternative: "Rebuilding the storefront on another framework",
      },
      {
        title: "Josh Wood Colour: a headless Shopify storefront rebuilt with Gatsby 5 and Storyblok",
        why: "Campaigns were hitting spam because of reputation and message content, not the platform. Fixing both restored inbox delivery without a migration.",
        alternative: "Moving campaigns to a new email provider",
      },
      {
        title: "Josh Wood Colour: a headless Shopify storefront rebuilt with Gatsby 5 and Storyblok",
        why: "Device-specific patches had produced inconsistent experiences. A single responsive redesign gave one shopping flow on every screen.",
        alternative: "Keeping separate mobile fixes",
      },
    ],
    highlights: [
      "Frontend optimizations on the Gatsby storefront that made the first load noticeably faster",
      "Fixed campaign emails going to spam by cleaning up the sending reputation and rewriting the message templates",
      "Led a responsive UX redesign to deliver a consistent shopping experience across mobile, tablet and desktop",
    ],
    impact:
      "A faster, fully responsive headless storefront whose marketing emails reach the inbox again, with one consistent shopping experience across mobile, tablet and desktop.",
    metrics: [
      {
        value: "~20%",
        label: "Faster initial load",
        context: "First-load performance of the storefront after the frontend optimizations",
      },
      {
        value: "x2",
        label: "Campaign email deliverability",
        context: "Inbox placement after the sender-reputation cleanup and template rewrite",
      },
    ],
    learnings: [
      "Performance work on a live store pays off fastest at the first load: that is where most shoppers decide whether to stay.",
      "Email deliverability is infrastructure. Reputation and content matter as much as the sending tool.",
    ],

    // project resources
    image: null,
    logo: null,
    links: {
      live: "https://joshwoodcolour.com",
      liveLabel: "VISIT THE STORE",
      repo: null,
    },
    images: [],
    team: null,
    related: ["portfolio", "patitas-a-casa"],
    gallery: [
      {
        src: "josh-wood-colour/jwc-home-hero",
        frame: "browser",
        url: "joshwoodcolour.com",
        alt: "Josh Wood Colour homepage hero: the Miracle System permanent colour kit with the claim 'Colour your hair on your terms' and an Add To Bag button",
        caption: "Homepage hero with the Miracle System, the store's flagship kit",
      },
      {
        src: "josh-wood-colour/jwc-home-quiz",
        frame: "browser",
        url: "joshwoodcolour.com",
        alt: "'Not sure where to start?' block offering a two-minute product quiz and a free video consultation",
        caption: "The product-matching quiz, the guided entry point for first-time buyers",
      },
      {
        src: "josh-wood-colour/jwc-home-mobile-hero",
        frame: "phone",
        alt: "Josh Wood Colour homepage on a phone: compact header, Miracle System hero and Add To Bag button",
        caption: "The same hero on mobile after the responsive redesign",
      },
      {
        src: "josh-wood-colour/jwc-home-bestsellers",
        frame: "browser",
        url: "joshwoodcolour.com",
        alt: "Best-selling salon quality colour and care: four product categories on pastel blocks with Shop Now buttons",
        caption: "Category grid rendered from Shopify collections",
      },
    ],
    architecture: {
      title: "Headless storefront: content and commerce feeding a static Gatsby build",
      caption: "How content, products and checkout reach the shopper",
      columns: [
        [
          { id: "storyblok", label: "Storyblok CMS", sub: "editorial content", kind: "external" },
          { id: "shopify", label: "Shopify", sub: "catalog · cart · checkout", kind: "external" },
        ],
        [{ id: "gatsby", label: "Gatsby 5 + React", sub: "static build" }],
        [{ id: "netlify", label: "Netlify Edge", sub: "behind Cloudflare" }],
        [{ id: "shopper", label: "Shopper", sub: "mobile · tablet · desktop", kind: "external" }],
      ],
      edges: [
        ["storyblok", "gatsby", "content"],
        ["shopify", "gatsby", "products"],
        ["gatsby", "netlify", "deploy"],
        ["netlify", "shopper", "HTML"],
      ],
    },

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
    order: 2,
    hook: "Telegram assistant for students, running 24/7 on n8n and Groq",
    title: "Juanda Bot: a Telegram AI assistant built with Python, n8n, Ollama and Groq",
    seoTitle: "Telegram AI Assistant: n8n, Ollama & Groq (How I Built It)",
    stack: "Python • Telegram API • Groq • n8n",
    seoDescription:
      "How I built a Telegram AI assistant: a Python bot answering with Groq Llama 3 on Render, and an n8n workflow with RAG, Ollama first and OpenAI/Groq fallbacks.",
    realSrc: "images/projects/juandabot.avif",
    blueprintSrc: "images/projects/juandabot_blueprint.avif",
    ogImage: "images/og/juandabot.jpg",

    // project details
    year: "2025",
    timeline: { start: "2025-05", end: "2025-05" },
    status: "live",
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
    org: {
      name: "Universidad del Valle",
      url: "https://www.univalle.edu.co/",
      client: "Companion to the thesis platform",
    },
    context:
      "Conversational support companion for the thesis platform (Universidad del Valle)",
    stackGroups: {
      backend: ["Python", "python-telegram-bot", "Flask", "Gunicorn"],
      ai: ["Groq · Llama 3 70B", "Ollama", "OpenAI", "RAG"],
      automation: ["n8n"],
      infra: ["Render", "Telegram Bot API"],
    },
    problem:
      "Users needed a fast, Telegram-native way to navigate the AI platform, access the right modules, and resolve questions about the thesis without waiting for manual support.",
    solution:
      "A Telegram assistant with two builds. The public one (repo linked below) is a Python bot on python-telegram-bot and Flask/Gunicorn, deployed on Render, that answers with Groq's Llama 3 70B and exposes commands for the oratory and critical-thinking modules, a usability survey and a QR code to the web app. A private iteration replaces the direct SDK call with n8n workflows: a RAG step retrieves context from the thesis documentation, Ollama runs inference locally first, and the flow falls back automatically to OpenAI and Groq.",
    constraints: [
      "Zero budget: free tiers only, for hosting and inference",
      "Had to answer 24/7 for students, with nobody on call",
      "Telegram as the only interface: commands and text, no rich UI",
    ],
    decisions: [
      {
        title: "Juanda Bot: a Telegram AI assistant built with Python, n8n, Ollama and Groq",
        why: "Sub-second responses at no cost fit an academic bot that had to stay online for a whole semester.",
        alternative: "A paid, single-provider setup",
      },
      {
        title: "Juanda Bot: a Telegram AI assistant built with Python, n8n, Ollama and Groq",
        why: "A public HTTPS endpoint that Telegram can reach, on a free tier, with no personal machine to keep awake.",
        alternative: "Running the bot from a local machine",
      },
      {
        title: "Juanda Bot: a Telegram AI assistant built with Python, n8n, Ollama and Groq",
        why: "The provider chain, the RAG step and the fallbacks live in a visual workflow that changes without redeploying code. Ollama runs first for privacy and cost; OpenAI and Groq only when it fails.",
        alternative: "Hard-coding the provider chain in the bot",
      },
    ],
    highlights: [
      "Instant, contextual answers about the platform directly inside Telegram, 24/7, with no manual support queue: AI speeches by level, random debate topics, YouTube resources, Story-Dice and puzzle games",
      "Commands for each module (/oratoria, /pensamiento), personal progress reports (/oratoriametricas and /debatemetricas pull your last 10 speeches or debates by email), a usability survey and direct links into the web app",
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
    learnings: [
      "Fallbacks matter more than the primary model: the bot is judged on the answer it gives when the first provider is down.",
      "Keeping inference behind a workflow made it possible to swap models in minutes as free tiers changed.",
    ],

    // project resources
    image: null,
    logo: null,
    links: {
      live: "https://t.me/auto_reply_juanda_bot",
      liveLabel: "OPEN IN TELEGRAM",
      repo: "https://github.com/heisjuanda/Juan-Dabot",
    },
    images: [],
    team: null,
    related: ["thesis"],
    gallery: [
      {
        src: "juandabot/juandabot-telegram-start-command",
        frame: "terminal",
        url: "Telegram Desktop · @auto_reply_juanda_bot",
        alt: "Telegram chat with Juan Dabot: the /start command answers with the activities it covers (AI speeches by level, random debate topics, YouTube resources, Story-Dice and puzzles, progress reports), links to the oratory and critical-thinking activities and the list of commands",
        caption: "/start: what the bot can do, direct links into the platform and the command list",
      },
      {
        src: "juandabot/juandabot-telegram-profile-n8n-replies",
        frame: "terminal",
        url: "Telegram Desktop · bot profile",
        alt: "Juan Dabot's Telegram profile: description 'Mejora tus habilidades blandas con mi ayuda (Oratoría y Pensamiento Crítico)', username auto_reply_juanda_bot, and recent replies generated by the n8n workflow evaluating a speech",
        caption: "Bot profile; the recent replies come from the private n8n build evaluating an exposition",
      },
      {
        src: "juandabot/juandabot-telegram-bot-card",
        frame: "paper",
        alt: "t.me landing card for Juan dabot with its hand-drawn avatar, the @auto_reply_juanda_bot handle, the soft-skills description and a Start Bot button",
        caption: "The bot's public card on t.me",
      },
    ],
    architecture: {
      title: "Two builds of the bot: public on Groq, private on n8n with local inference first",
      caption: "Public build on top, private build below; fallbacks run left to right",
      columns: [
        [{ id: "tg", label: "Telegram", sub: "commands + chat", kind: "external" }],
        [
          { id: "flask", label: "Public build", sub: "python-telegram-bot · Flask on Render" },
          { id: "n8n", label: "Private build", sub: "n8n workflow" },
        ],
        [
          { id: "groq", label: "Groq · Llama 3 70B", sub: "public answers", kind: "external" },
          { id: "rag", label: "RAG", sub: "thesis documentation", kind: "store" },
        ],
        [
          { id: "ollama", label: "Ollama", sub: "local inference, first" },
          { id: "openai", label: "OpenAI", sub: "fallback 1", kind: "external" },
          { id: "groq2", label: "Groq", sub: "fallback 2", kind: "external" },
        ],
      ],
      edges: [
        ["tg", "flask"],
        ["tg", "n8n"],
        ["flask", "groq"],
        ["n8n", "rag", "retrieve"],
        ["rag", "ollama", "context"],
        ["ollama", "openai", "on failure"],
        ["openai", "groq2", "on failure"],
      ],
    },
    designSystem: null,
  },
  {
    // project card data
    id: "lambda-lang",
    name: "Lambda Lang",
    order: 6,
    hook: "A small language and its interpreter, built from the grammar up",
    title: "Lambda Lang: an interpreter for a small language, built in Racket with EOPL and SLLGEN",
    seoTitle: "Building an Interpreter in Racket with EOPL & SLLGEN",
    stack: "Racket • EOPL • Interpreter Design",
    seoDescription:
      "Case study: building an interpreter in Racket with EOPL and SLLGEN. Scanner, parser, AST and evaluator for a small language with procedures, objects and methods.",
    realSrc: "images/projects/lambda_lang.avif",
    blueprintSrc: "images/projects/lambda_lang_blueprint.avif",
    ogImage: "images/og/lambda-lang.jpg",

    // project details
    year: "2023",
    timeline: { start: "2022", end: "2023" },
    status: "archived",
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
    org: {
      name: "Universidad del Valle",
      url: "https://www.univalle.edu.co/",
      client: "Fundamentals of Programming Languages (FLP)",
    },
    context:
      "Final project for Fundamentals of Programming Languages (FLP), Universidad del Valle, 2022–2023",
    stackGroups: {
      language: ["Racket", "#lang eopl", "Scheme"],
      toolkit: ["sllgen scanner & parser", "define-datatype AST"],
      concepts: ["Environments", "Closures", "Objects & methods", "REPL"],
    },
    problem:
      "Reading about how programming languages work is abstract. The course asked us to build one: a language with its own grammar, an interpreter that executes it, and a REPL to try it live.",
    solution:
      "A language and interpreter written in Racket with the EOPL toolkit (#lang eopl). sllgen generates the scanner and parser from the grammar; the evaluator walks the AST with environments that support variables, let and letrec, assignment, procedures, methods and objects with send, update and clone. A REPL evaluates each expression live, and the AST of any program can be inspected to see how it was understood.",
    constraints: [
      "A one-semester course project for a team of four",
      "The whole interpreter lives in a single Racket file, so it had to stay readable",
      "The grammar had to cover assignment, procedures and objects, not just expressions",
    ],
    decisions: [
      {
        title: "Lambda Lang: an interpreter for a small language, built in Racket with EOPL and SLLGEN",
        why: "sllgen generates the scanner and parser from the grammar specification, so the effort went into semantics: environments, evaluation rules and objects.",
        alternative: "A recursive-descent parser written by hand",
      },
      {
        title: "Lambda Lang: an interpreter for a small language, built in Racket with EOPL and SLLGEN",
        why: "set needs mutable bindings. Storing values in vectors behind the environment keeps let, letrec and set consistent with each other.",
        alternative: "Immutable environments with no assignment",
      },
      {
        title: "Lambda Lang: an interpreter for a small language, built in Racket with EOPL and SLLGEN",
        why: "It let us explore object semantics (state, dispatch, cloning) on top of the functional core without building a class system.",
        alternative: "Procedures and records only",
      },
    ],
    highlights: [
      "Grammar to interpreter in one pipeline: sllgen scanner and parser, AST datatypes and an environment-based evaluator",
      "Objects, methods and clone semantics on top of a functional core with let, letrec, procedures and apply",
      "A REPL to run programs live, with the AST available for inspection: parsing and evaluation made visible instead of theoretical",
    ],
    impact:
      "A from-scratch language and interpreter that turned parsing, environments and evaluation into working code, with a REPL to run every expression live.",
    metrics: null,
    learnings: [
      "Writing the evaluator makes scope rules concrete: every closure bug turns out to be an environment bug.",
      "Inspecting the AST is the fastest debugging tool a language project can have.",
    ],

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
    related: ["thesis"],
    codeSample: {
      title: "Lambda Lang: an interpreter for a small language, built in Racket with EOPL and SLLGEN",
      caption: "The interpreter's REPL: primitives, let, letrec, methods and objects",
      lang: "Racket · #lang eopl",
      prompt: "-->",
      lines: [
        { kind: "comment", text: "* primitives take their operands in parentheses *" },
        { kind: "prompt", text: "+(2, *(3, 4))" },
        { kind: "out", text: "14" },
        { kind: "prompt", text: "let x = 5, y = 10 in *(x, y) end" },
        { kind: "out", text: "50" },
        { kind: "comment", text: "* letrec: recursive procedures, with if / is *" },
        { kind: "prompt", text: "letrec fact(n) = if is(n, 0) then 1 else *(n, apply fact(-(n, 1))) end in apply fact(5) end" },
        { kind: "out", text: "120" },
        { kind: "comment", text: "* methods receive self first; objects hold fields and methods *" },
        { kind: "prompt", text: "let m = meth(s, n) +(n, 1) end in apply m(7, 6) end" },
        { kind: "out", text: "7" },
        { kind: "prompt", text: "let casita = object{ z => 1 m => meth(s, n) +(n, 1) end } in send casita.m(41) end" },
        { kind: "out", text: "42" },
      ],
    },
    architecture: {
      title: "From program text to value: the EOPL pipeline",
      caption: "How the interpreter runs a program",
      columns: [
        [{ id: "text", label: "Program text", sub: "typed at the --> prompt", kind: "external" }],
        [
          { id: "scanner", label: "Scanner", sub: "especificacion-lexica" },
          { id: "parser", label: "Parser", sub: "especificacion-gramatical" },
        ],
        [{ id: "ast", label: "AST", sub: "sllgen:make-define-datatypes" }],
        [
          { id: "eval", label: "evaluar-programa", sub: "expression walker" },
          { id: "env", label: "Environments", sub: "vector-backed refs for set", kind: "store" },
        ],
        [{ id: "value", label: "Value", sub: "printed by the REPL", kind: "external" }],
      ],
      edges: [
        ["text", "scanner", "tokens"],
        ["scanner", "parser"],
        ["parser", "ast"],
        ["ast", "eval"],
        ["eval", "env", "lookup · set"],
        ["eval", "value"],
      ],
    },
    designSystem: null,
  },
  {
    // project card data
    id: "patitas-a-casa",
    name: "Patitas a Casa",
    order: 4,
    hook: "One adoption platform for shelters in Mendoza, Argentina",
    title: "Patitas a Casa: a volunteer-built pet adoption platform in React, Express and MongoDB",
    seoTitle: "Pet Adoption Platform in React, Node & MongoDB: Case Study",
    stack: "React • TypeScript • Node • MongoDB",
    seoDescription:
      "Case study: a volunteer pet adoption platform in React, TypeScript, Express and MongoDB for shelters in Mendoza, Argentina, with adoption and lost-pet listings.",
    realSrc: "images/projects/patitas_a_casa.avif",
    blueprintSrc: "images/projects/patitas_a_casa_blueprint.avif",
    ogImage: "images/og/patitas-a-casa.jpg",

    // project details
    year: "2023",
    timeline: { start: "2023-01", end: "2024-06" },
    status: "archived",
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
    org: {
      name: "Patitas a Casa",
      client: "Volunteer non-profit, Mendoza, Argentina",
    },
    context:
      "Volunteer, community-driven non-profit project based in Mendoza, Argentina (2023–2024)",
    stackGroups: {
      frontend: ["React", "Vite", "TypeScript", "CSS Modules", "react-hook-form"],
      backend: ["Node.js", "Express", "TypeScript", "MongoDB · Mongoose"],
      services: ["Cloudinary", "Brevo", "Vercel"],
    },
    problem:
      "Stray dogs in Argentina have very low adoption visibility — shelters rely on fragmented social media posts.",
    solution:
      "A React, Vite and TypeScript frontend with CSS Modules and react-hook-form, backed by a Node/Express API in TypeScript with MongoDB (Mongoose), Cloudinary for pet photos and Brevo for email. Shelters and individuals publish dogs for adoption and lost-and-found reports with location, photos, search filters and status tracking. The team also explored a parallel .NET API.",
    constraints: [
      "A rotating volunteer team of ten, contributing in their spare time",
      "No budget: free tiers for hosting, database and media",
      "Shelters with little technical experience had to publish on their own",
    ],
    decisions: [
      {
        title: "Patitas a Casa: a volunteer-built pet adoption platform in React, Express and MongoDB",
        why: "Adoption and lost-pet forms are long. Uncontrolled fields with schema validation kept them fast and consistent across views.",
        alternative: "Hand-rolled controlled state per field",
      },
      {
        title: "Patitas a Casa: a volunteer-built pet adoption platform in React, Express and MongoDB",
        why: "Uploads, resizing and delivery are handled by the service, so the API never stores or processes images.",
        alternative: "Storing uploads on the server",
      },
      {
        title: "Patitas a Casa: a volunteer-built pet adoption platform in React, Express and MongoDB",
        why: "Scoped styles let ten contributors work on views in parallel without a shared design-token setup.",
        alternative: "Tailwind CSS",
      },
    ],
    highlights: [
      "Led the frontend implementation of the platform's core views and user flows",
      "Developed shelter-related views to improve visibility for organizations and their available dogs",
      "Debugged and refined existing frontend behavior to improve stability and consistency",
    ],
    impact:
      "A centralized adoption platform that replaced fragmented social media posts with a unified, accessible space for shelters and individuals — bringing more dogs closer to a home.",
    metrics: null,
    learnings: [
      "In a volunteer team, a stable frontend structure matters more than any single feature.",
      "Stabilizing existing views was as valuable as shipping new ones: consistency is what kept contributors productive.",
    ],

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
    related: ["josh-wood-colour"],
    gallery: [
      {
        src: "patitas-a-casa/patitas-adoptar-desktop",
        frame: "browser",
        url: "patitas-a-casa-frontend.vercel.app/adoptar",
        alt: "'Mascotas en Adopción' listing: cards with each pet's photo, name, age, shelter, contact and share buttons",
        caption: "Adoption listing, one card per pet with shelter and contact",
      },
      {
        src: "patitas-a-casa/patitas-home-hero",
        frame: "browser",
        url: "patitas-a-casa-frontend.vercel.app",
        alt: "Patitas a Casa home: a dog portrait beside the slogan 'Rescatando patitas, salvando corazones' with Reportar and Adoptar buttons",
        caption: "Home hero with the two main actions: report a pet, adopt a pet",
      },
      {
        src: "patitas-a-casa/patitas-adoptar-mobile",
        frame: "phone",
        alt: "Adoption listing on a phone: hamburger menu, heading and a pet card",
        caption: "The listing on mobile",
      },
      {
        src: "patitas-a-casa/patitas-perdidos-desktop",
        frame: "browser",
        url: "patitas-a-casa-frontend.vercel.app/perdidos",
        alt: "'Mascotas Perdidas' page: lost-pet cards with size, area, contact, description and date",
        caption: "Lost-and-found module for pets reported missing",
      },
    ],
    architecture: {
      title: "React frontend, Express API and MongoDB, with Cloudinary and Brevo as services",
      caption: "Where a published pet goes",
      columns: [
        [{ id: "web", label: "React + Vite + TS", sub: "CSS Modules · react-hook-form" }],
        [{ id: "api", label: "Express API", sub: "TypeScript · JWT · zod" }],
        [
          { id: "mongo", label: "MongoDB", sub: "Mongoose", kind: "store" },
          { id: "cloudinary", label: "Cloudinary", sub: "pet photos", kind: "external" },
          { id: "brevo", label: "Brevo", sub: "email", kind: "external" },
        ],
      ],
      edges: [
        ["web", "api", "REST"],
        ["api", "mongo", "listings"],
        ["api", "cloudinary", "uploads"],
        ["api", "brevo", "notifications"],
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
    order: 5,
    hook: "This site: PageSpeed 100 without giving up the motion",
    title: "How I built this site at PageSpeed 100: React, GSAP, prerender and a Cloudflare Worker",
    nickname: "My Portfolio",
    seoTitle: "React + GSAP Portfolio at PageSpeed 100: How I Built It",
    stack: "React • CSS • JavaScript",
    seoDescription:
      "How I built this React and GSAP portfolio to score 100 on PageSpeed: build-time prerender, a Cloudflare Worker rewriting the head per route, AVIF and Lenis.",
    realSrc: "images/projects/portfolio.avif",
    blueprintSrc: "images/projects/portfolio_blueprint.avif",
    ogImage: "images/og/portfolio.jpg",

    // project details
    year: "2026",
    timeline: { start: "2026-06", end: null },
    status: "live",
    category: "Frontend · Design",
    tags: [
      "Motion Design",
      "GSAP",
      "Bento Layout",
      "SplitText",
      "Micro-animations",
    ],
    role: "Designer · Frontend Developer",
    org: { name: "Personal project" },
    context:
      "Personal project: a portfolio that reads like a drafting table full of blueprints, notes and paper, instead of a resume",
    stackGroups: {
      frontend: ["React 19", "Vite 8", "Vanilla CSS"],
      motion: ["GSAP", "Lenis"],
      infra: ["Cloudflare Workers", "Build-time prerender", "AVIF"],
      analytics: ["GA4 · Consent Mode v2"],
    },
    problem:
      "Most developer portfolios look like resumes. I wanted mine to feel like a creative piece.",
    solution:
      "A React and GSAP scrolling experience that tells my story, presents my projects and skills, and combines accessible interactions with carefully optimized motion.",
    constraints: [
      "PageSpeed 100 in every category as a hard target",
      "Every animation has to degrade gracefully under prefers-reduced-motion",
      "No CSS framework, no UI kit: the hand-drawn look had to be built from scratch",
    ],
    decisions: [
      {
        title: "How I built this site at PageSpeed 100: React, GSAP, prerender and a Cloudflare Worker",
        why: "Crawlers that do not run JavaScript get the full page, and there is no server render per request. The Cloudflare Worker only swaps title, meta and JSON-LD per route.",
        alternative: "Server-side rendering on Workers",
      },
      {
        title: "How I built this site at PageSpeed 100: React, GSAP, prerender and a Cloudflare Worker",
        why: "The paper, tape and blueprint effects need clip-paths, masks and blend modes that no utility framework expresses well.",
        alternative: "Tailwind CSS or a component library",
      },
      {
        title: "How I built this site at PageSpeed 100: React, GSAP, prerender and a Cloudflare Worker",
        why: "The smallest bytes for the hand-drawn artwork. Google Images has indexed AVIF since 2024, and preloads make the hero paint first.",
        alternative: "WebP with JPEG fallbacks",
      },
      {
        title: "How I built this site at PageSpeed 100: React, GSAP, prerender and a Cloudflare Worker",
        why: "Consent Mode v2 keeps GA4 unloaded until the visitor says yes, so nothing is stored on a visit that declined.",
        alternative: "Loading analytics by default",
      },
    ],
    highlights: [
      "A scrolling story: hero, about desk, blueprint project cards and a paper-plane contact section",
      "An interactive UI system (doors, notes, tape, blueprints) that reflects product thinking and detail-oriented execution",
      "Perfect PageSpeed scores while keeping the motion, thanks to preloading, prerendering and AVIF",
    ],
    impact:
      "A scrolling experience that tells my story, my projects, and my skills through a highly crafted frontend experience — communicating both technical depth and design sensibility.",
    metrics: [
      {
        value: "100",
        label: "PageSpeed desktop, all four categories",
        context: "Google PageSpeed Insights: performance, accessibility, best practices and SEO",
      },
      {
        value: "96",
        label: "PageSpeed mobile performance",
        context: "Accessibility, best practices and SEO at 100 on mobile",
      },
    ],
    learnings: [
      "Motion sells the site, but preloading and prerendering are what make it feel fast.",
      "Accessibility choices (skip nav, reduced motion, optional sound) cost little and shaped the design for the better.",
    ],

    // project resources
    image: null,
    logo: null,
    links: {
      live: "https://juandamoreno.dev",
      repo: "https://github.com/heisjuanda/personal-portfolio",
    },
    images: null,
    team: null,
    related: ["josh-wood-colour"],
    gallery: [
      {
        src: "portfolio/portfolio-projects-reveal",
        frame: "browser",
        url: "juandamoreno.dev",
        alt: "Projects section of juandamoreno.dev: blueprint cards with hand-drawn sketches of Josh Wood Colour and Juanda Bot, and the paper character walking between them",
        caption: "Blueprint project cards, mid-reveal on scroll",
      },
      {
        src: "portfolio/portfolio-hero",
        frame: "browser",
        url: "juandamoreno.dev",
        alt: "Hero: 'JuanDa's Adventure' in cut-out collage letters over torn paper, with the paper character in front",
        caption: "Collage hero on torn paper",
      },
      {
        src: "portfolio/portfolio-about-desk",
        frame: "browser",
        url: "juandamoreno.dev/#about",
        alt: "About section: a graph-paper desk with a wooden door, tech-stack stickers, a laptop sketch and a window doodle",
        caption: "About canvas: every doodle opens a hand-written note",
      },
      {
        src: "portfolio/portfolio-contact",
        frame: "browser",
        url: "juandamoreno.dev/#contact",
        alt: "Contact section: four sticky notes with email, WhatsApp, networks and a CV download pinned on kraft paper",
        caption: "Contact board on kraft paper",
      },
    ],
    architecture: {
      title: "Build-time prerender with per-route head rewriting at the edge",
      caption: "From source to a crawlable page",
      columns: [
        [{ id: "src", label: "React 19 + data", sub: "projects.data.js · routes.seo.js" }],
        [
          { id: "vite", label: "Vite 8 build", sub: "client + worker" },
          { id: "pre", label: "Prerender", sub: "react-dom/static → HTML per route" },
        ],
        [{ id: "worker", label: "Cloudflare Worker", sub: "title · meta · JSON-LD per route" }],
        [
          { id: "browser", label: "Browser", sub: "hydrate · GSAP · Lenis", kind: "external" },
          { id: "bots", label: "Crawlers", sub: "full HTML, no JS needed", kind: "external" },
        ],
      ],
      edges: [
        ["src", "vite"],
        ["vite", "pre"],
        ["pre", "worker", "static HTML"],
        ["worker", "browser"],
        ["worker", "bots"],
      ],
    },
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
    order: 1,
    hook: "AI trainer for public speaking and debate, 95% usability approval",
    title: "Building an AI public speaking and debate trainer with FastAPI, React, Whisper and Llama 3",
    nickname: "My Thesis",
    seoTitle: "AI Public Speaking & Debate Trainer (Thesis): Whisper + LLM",
    alternateName:
      "Creación de módulos interactivos para el desarrollo continuo de la oratoria y el pensamiento crítico en el prototipo de enseñanza de habilidades blandas",
    stack: "FastAPI • Python • React • Groq",
    seoDescription:
      "Undergraduate thesis at Universidad del Valle: an AI public speaking and debate trainer built with FastAPI, React, Whisper and Llama 3, with 95% usability approval.",
    realSrc: "images/projects/thesis.avif",
    blueprintSrc: "images/projects/thesis_blueprint.avif",
    ogImage: "images/og/thesis.jpg",

    // project details
    year: "2025",
    timeline: { start: "2025-02", end: "2025-06" },
    status: "live",
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
    org: {
      name: "Universidad del Valle",
      url: "https://www.univalle.edu.co/",
      client: "Systems Engineering undergraduate thesis",
    },
    context:
      "Undergraduate thesis in Systems Engineering, Universidad del Valle (2025), built on the soft-skills platform started by Juan Azcárate",
    stackGroups: {
      frontend: ["React 18", "MUI", "react-webcam"],
      backend: ["FastAPI", "SQLModel", "PostgreSQL"],
      ai: ["Whisper (Groq)", "Llama 3.3 70B (Groq)", "GPT-4o mini (OpenAI)"],
      infra: ["Vercel", "Auth0"],
    },
    problem:
      "Systems engineering students needed a practical way to improve communication and critical thinking skills to strengthen their academic and professional profile.",
    solution:
      "A FastAPI and React platform with modules for oratory, critical thinking and debate. Speech exercises are recorded in the browser, transcribed with Whisper through Groq and evaluated asynchronously; Groq's Llama 3.3 70B and OpenAI's GPT-4o mini generate the debate topics and structured, personalized feedback. PostgreSQL stores progress and Auth0 handles sign-in.",
    constraints: [
      "One academic semester for design, build and user testing",
      "An inherited codebase (React 18, MUI, Auth0) that had to keep working for its other modules",
      "Spanish-speaking students, so transcription and feedback had to work well in Spanish",
    ],
    decisions: [
      {
        title: "Building an AI public speaking and debate trainer with FastAPI, React, Whisper and Llama 3",
        why: "Server-side transcription gives consistent accuracy in Spanish and lets the evaluation run asynchronously after the recording.",
        alternative: "The browser's Web Speech API",
      },
      {
        title: "Building an AI public speaking and debate trainer with FastAPI, React, Whisper and Llama 3",
        why: "Groq covers the volume at speed and no cost; GPT-4o mini is a second provider for topic generation and feedback when quality or availability calls for it.",
        alternative: "A single provider",
      },
      {
        title: "Building an AI public speaking and debate trainer with FastAPI, React, Whisper and Llama 3",
        why: "Transcription plus LLM feedback takes seconds. Running it in the background keeps the UI responsive and lets students move on and come back.",
        alternative: "Waiting on the request while the model answers",
      },
      {
        title: "Building an AI public speaking and debate trainer with FastAPI, React, Whisper and Llama 3",
        why: "Reusing its auth, dashboard and database meant the semester went into the oratory, critical-thinking and debate modules instead of scaffolding.",
        alternative: "A greenfield application",
      },
    ],
    highlights: [
      "Two complete learning modules for oratory and critical thinking, from UX to AI integration",
      "Browser recording, Whisper transcription and LLM evaluation wired into an asynchronous feedback pipeline",
      "Usability tests with systems engineering students that shaped the final version of both modules",
    ],
    impact:
      "An end-to-end AI learning platform that achieved 95% usability approval and measurably improved both oratory confidence and argument coherence in systems engineering students.",
    metrics: [
      {
        value: "85%",
        label: "Students improved speaking confidence",
        context: "Self-reported after using the oratory module",
      },
      {
        value: "92%",
        label: "Participants with stronger debate coherence",
        context: "Measured in debate responses after the module",
      },
      {
        value: "95%",
        label: "Positive usability feedback",
        context: "Usability tests with participating students",
      },
    ],
    learnings: [
      "Transcription quality drives the whole feedback loop: a weak transcript produces confident but wrong feedback.",
      "Asynchronous evaluation changed the experience: students could record, move on and come back to their feedback.",
    ],

    // project resources
    image: null,
    logo: null,
    links: {
      live: "https://trabajo-de-grado-2-front.vercel.app/",
      liveLabel: "OPEN THE PLATFORM",
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
    related: ["juandabot", "lambda-lang"],
    gallery: [
      {
        src: "thesis/thesis-oratoria-module-hub",
        frame: "browser",
        url: "trabajo-de-grado-2-front.vercel.app/activity/oratoria",
        alt: "Oratory module hub: 'Desarrolla Tus Habilidades De Oratoria' with three cards, speech challenges, oratory videos and exercises, plus a floating 'chat with JuandaBot on Telegram' bubble",
        caption: "Oratory module: speech challenges, videos and exercises, with the Telegram bot one tap away",
      },
      {
        src: "thesis/thesis-oratoria-new-speech-advanced",
        frame: "browser",
        url: "trabajo-de-grado-2-front.vercel.app/activity/oratoria/start",
        alt: "'Empezar Nuevo Discurso': difficulty selector set to Avanzado and the generated topic description challenging experienced speakers with abstract themes and unexpected obstacles",
        caption: "Starting a speech: pick a difficulty, the model generates the topic",
      },
      {
        src: "thesis/thesis-pensamiento-critico-module-hub",
        frame: "browser",
        url: "trabajo-de-grado-2-front.vercel.app/activity/debate-ia",
        alt: "Critical thinking module hub: 'Desarrolla Tus Habilidades De Pensamiento Crítico' with cards for AI debate, videos and logic puzzles",
        caption: "Critical thinking module: AI debate, videos and puzzles",
      },
      {
        src: "thesis/thesis-debate-new-topic-mobile",
        frame: "phone",
        alt: "'Empezar Nuevo Debate' on a phone: topic category set to Educación and the generated debate description about teaching methods and access to education",
        caption: "Starting a debate on mobile: the model generates a topic for the chosen category",
      },
    ],
    architecture: {
      title: "Recording in the browser, transcription and feedback on the server",
      caption: "Path of an oratory exercise",
      columns: [
        [
          { id: "browser", label: "React 18 client", sub: "react-webcam recording", kind: "external" },
          { id: "auth", label: "Auth0", sub: "sign-in", kind: "external" },
        ],
        [{ id: "api", label: "FastAPI", sub: "async evaluation jobs" }],
        [
          { id: "whisper", label: "Whisper (Groq)", sub: "speech → text", kind: "external" },
          { id: "llm", label: "LLM feedback", sub: "Llama 3.3 70B · GPT-4o mini", kind: "external" },
          { id: "pg", label: "PostgreSQL", sub: "SQLModel", kind: "store" },
        ],
      ],
      edges: [
        ["browser", "api", "audio + answers"],
        ["browser", "auth", "login"],
        ["api", "whisper", "transcribe"],
        ["api", "llm", "evaluate"],
        ["api", "pg", "progress"],
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
