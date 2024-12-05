import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [preact()],
  base: mode === 'production' ? '/SimpleWebshop/' : '/', // Use base path only in production
}));
