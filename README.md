# 🛠️ Personal Portfolio — Juan David Moreno

[![Live Site](https://img.shields.io/badge/Live-juandamoreno.dev-blue?style=flat-square&logo=google-chrome&logoColor=white)](https://juandamoreno.dev/)
[![React Version](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-8.0-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-green?style=flat-square&logo=greensock)](https://greensock.com/gsap/)

> **"Most developer portfolios look like resumes. I wanted mine to feel like a creative piece."**
> A highly crafted, motion-driven, and high-performance frontend experience built to showcase my projects, skills, and frontend craftsmanship.

---

## ⚡ Performance: Perfect PageSpeed Scores (100/100)

This portfolio is optimized for speed, accessibility, SEO, and best practices. It achieves **perfect 100/100 scores** on Google PageSpeed Insights for both mobile and desktop views:

| Platform | Performance | Accessibility | Best Practices | SEO | Report Link |
|:---|:---:|:---:|:---:|:---:|:---:|
| **📱 Mobile** | 🟢 **96** | 🟢 **100** | 🟢 **100** | 🟢 **100** | [Check Mobile PageSpeed](https://pagespeed.web.dev/analysis/https-juandamoreno-dev/d26lgwz99r?form_factor=mobile) |
| **💻 Desktop** | 🟢 **100** | 🟢 **100** | 🟢 **100** | 🟢 **100** | [Check Desktop PageSpeed](https://pagespeed.web.dev/analysis/https-juandamoreno-dev/d26lgwz99r?form_factor=desktop) |

### Optimization Techniques Implemented:
- **Font & Asset Preloading**: Critical fonts (`collage_font`, `sharpie_font`) and LCP (Largest Contentful Paint) images are preloaded to eliminate Flash of Invisible Text (FOIT) and improve request discovery.
- **Resource Compression**: Utilizes `vite-plugin-compression2` to generate compressed assets during build.
- **CSS Injection**: Injects styles directly using `vite-plugin-css-injected-by-js` to optimize styling delivery.
- **Semantic SEO**: Includes semantic HTML, complete Open Graph / Twitter cards, meta descriptions, and custom JSON-LD schemas for search engines.
- **Smooth Layout Rendering**: Designed with GSAP and Lenis for fluid, hardware-accelerated animations and scrolling without layout shifts.

---

## 🎨 Tech Stack & Tools

- **Core**: [React 19](https://react.dev/) & [Vite](https://vite.dev/)
- **Styling**: Vanilla CSS for maximum control and custom styling tokens.
- **Motion & Interactions**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) for smooth animations, text splits, and transitions.
- **Scrolling**: [Lenis](https://lenis.darkroom.engineering/) for high-performance smooth scrolling.
- **Routing**: [React Router v7](https://reactrouter.com/) for single-page application navigation.
- **SEO & Metadata**: [React Helmet Async](https://github.com/staylor/react-helmet-async) for dynamic document head management.

---

## 📁 Project Structure

```
personal-portfolio/
├── public/                 # Static assets (favicons, fonts, images)
├── src/
│   ├── assets/             # Shared media assets
│   ├── components/         # Reusable UI Components (SEOHead, SmoothScroll, etc.)
│   ├── constants/          # Application constants
│   ├── views/              # Page layouts & specific views (Home, ProjectDetails)
│   │   ├── data/           # Core portfolio data (projects.data.js)
│   │   └── ProjectDetails/ # Blueprint-style project detail view
│   ├── App.jsx             # Main Router configuration
│   ├── index.css           # Global custom theme styles & tokens
│   └── main.jsx            # Application entry point
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite plugins & build setup
```

---

## 🚀 Getting Started

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/heisjuanda/personal-portfolio.git
cd personal-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 👨‍💻 Author

**Juan David Moreno**
- Website: [juandamoreno.dev](https://juandamoreno.dev/)
- LinkedIn: [Juan David Moreno](https://www.linkedin.com/in/juan-david-moreno-883a46233/)
- GitHub: [@heisjuanda](https://github.com/heisjuanda)
