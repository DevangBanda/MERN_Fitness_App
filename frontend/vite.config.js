import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  loader: {
    '.js': 'jsx', // Set the loader for .js files to 'jsx'
  },
  server: {
    port: 5173, // Change this to your desired port number
  },
})
