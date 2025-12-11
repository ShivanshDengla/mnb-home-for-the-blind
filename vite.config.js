import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const friendlyRoutes = {
  '/': 'index.html',
  '/about': 'about.html',
  '/programmes': 'programmes.html',
  '/gallery': 'gallery.html',
  '/donate': 'donate.html',
  '/contact': 'contact.html',
  '/successstories': 'successstories.html',
  '/support': 'support.html',
  '/testimonials': 'testimonials.html',
}

const pagesDir = path.resolve(__dirname, 'pages')

const serveFriendlyRoutes = () => ({
  name: 'serve-friendly-static-routes',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = new URL(req.url || '/', 'http://localhost').pathname.replace(/\/+$/, '') || '/'
      const target = friendlyRoutes[pathname]
      if (!target) return next()

      const filePath = path.join(pagesDir, target)
      if (!fs.existsSync(filePath)) return next()

      res.setHeader('Content-Type', 'text/html')
      res.end(fs.readFileSync(filePath))
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = new URL(req.url || '/', 'http://localhost').pathname.replace(/\/+$/, '') || '/'
      const target = friendlyRoutes[pathname]
      if (!target) return next()

      const filePath = path.join(pagesDir, target)
      if (!fs.existsSync(filePath)) return next()

      res.setHeader('Content-Type', 'text/html')
      res.end(fs.readFileSync(filePath))
    })
  },
})

const copyPagesToDist = () => ({
  name: 'copy-pages-to-dist',
  closeBundle() {
    const destDir = path.resolve(__dirname, 'dist/pages')
    fs.rmSync(destDir, { recursive: true, force: true })
    fs.mkdirSync(destDir, { recursive: true })
    fs.cpSync(pagesDir, destDir, { recursive: true })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveFriendlyRoutes(), copyPagesToDist()],
})
