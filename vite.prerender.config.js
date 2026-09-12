import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: "src/entry-server.jsx",
    outDir: ".prerender",
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
  },
  ssr: {
    noExternal: ["gsap", "lenis", "react-helmet-async"],
  },
});
