import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import injectCSS from 'vite-plugin-css-injected-by-js';
import { compression } from 'vite-plugin-compression2';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), injectCSS(), compression({ algorithm: 'brotli' }), cloudflare()],
})