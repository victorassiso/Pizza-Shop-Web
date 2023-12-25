import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pizza-shop-web/sign-in',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
