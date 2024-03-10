import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    rollupOptions: {
      output: {
        dir: './dist/',
        entryFileNames: 'cookies_api_v1.js',
        //assetFileNames: 'plugin.css',
        //chunkFileNames: "chunk.js",
        manualChunks: undefined,
      }
    }
  },
});
