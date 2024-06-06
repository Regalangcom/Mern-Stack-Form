import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@eli': path.resolve(__dirname, 'src'),
      '@eli-style': path.resolve(__dirname, 'style')
    }
  }
})
