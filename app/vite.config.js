import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: [
      // Tell esbuild to treat these file extensions as JSX
      "src/**/*.js",
      "src/**/*.jsx",
      "src/**/*.ts",
      "src/**/*.tsx"
    ]
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  }
})