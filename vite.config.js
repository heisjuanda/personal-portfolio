import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), compression({ algorithm: 'brotli' }), cloudflare()],
  build: {
    rollupOptions: {
      output: {
        // src/utils/loadMotion.js imports gsap, ScrollTrigger and lenis
        // together, so keep them in one chunk instead of the three Rollup
        // would emit per dynamic import. They are always fetched at the same
        // moment, and one request beats three.
        manualChunks(id) {
          if (/node_modules[/\\](gsap|lenis)[/\\]/.test(id)) return 'motion';
        },
      },
    },
  },
})
