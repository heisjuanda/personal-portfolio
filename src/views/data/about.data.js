/**
 * Content for the hand-drawn notes that open from the About canvas.
 *
 * Link syntax: write {token} inside `content` or any `achievement`, and declare
 * the token in the entry's `links` map. PaperContent resolves them:
 *   { to }   -> in-app navigation (react-router Link)
 *   { href } -> external link, opens in a new tab
 * `titleHref` turns the note's heading into an external link.
 */
export const PAPER_CONTENT = {
  laptop: {
    title: "CoDe & Architecture",
    content:
      "I have +4 years of experience building web apps. I love working with React and creating clear, useful interfaces. I work well in a team, and I also enjoy focused solo work on full-stack features and cloud infrastructure.",
  },
  chair: {
    title: "ReMote headquarters",
    content:
      "I am based in Cali, Colombia, and work with distributed teams worldwide. A good desk setup and a cup of coffee help me switch between team meetings and deep focus time. I aim for clean, simple solutions to complex problems.",
  },
  cressco: {
    title: "Cressco",
    titleHref: "https://www.cressco.dev/en/",
    content:
      "Agency work for client products. I led the frontend and also handled the infrastructure around it: DNS, deployments and email delivery, for healthcare and e-commerce teams.",
    links: {
      joshwood: {
        label: "joshwoodcolour.com",
        to: "/projects/josh-wood-colour",
      },
    },
    experience: {
      role: "Software Developer",
      achievement: [
        "Added autosave to Reddocares' medical forms, so staff no longer lost long records when a tab closed or the connection dropped.",
        "Made {joshwood}, an online store, load 20% faster.",
        "Fixed Josh Wood's email campaigns that were going to spam, by cleaning up their sending reputation and rewriting the messages.",
      ],
    },
  },
  truora: {
    title: "Truora (Current)",
    titleHref: "https://www.truora.com/",
    content:
      "Truora checks identities and prevents fraud for companies across Latin America. I build the products that decide if a person really is who they say they are: web features, APIs in Go, Android SDK components and services on AWS.",
    experience: {
      role: "Software Engineer",
      achievement: [
        "Cut review time in half (from 60 to 30 seconds per case) on the tool people use to check validations our models are unsure about, with the same quality of decisions.",
        "Designed Labeling Review, which turns those same validations into training data for Truora's internal AI models, reusing what we already had instead of building a new system.",
        "Rebuilt how we read and validate Colombian driver's licenses, a key requirement for one of Truora's biggest clients.",
      ],
    },
  },
  globe: {
    title: "waNDerlust & Curiosity",
    content:
      "Travel keeps me curious. My trip to Rio de Janeiro, Brazil, was my farthest and most memorable so far. I bring that same curiosity to software—I'm always ready to learn new tools and tech stacks.",
  },
  gym: {
    title: "Consistency & health",
    content:
      "I go to the gym to stay healthy and keep improving. It builds the discipline I need for long coding sessions. Being consistent in training helps me stay consistent at work too.",
  },
};
