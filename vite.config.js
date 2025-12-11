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
    const distDir = path.resolve(__dirname, 'dist')
    const destPagesDir = path.join(distDir, 'pages')

    // Keep the original folder of static pages for direct linking (e.g. /pages/programmes.html)
    fs.rmSync(destPagesDir, { recursive: true, force: true })
    fs.mkdirSync(destPagesDir, { recursive: true })
    fs.cpSync(pagesDir, destPagesDir, { recursive: true })

    // Also publish pretty URLs so /about, /programmes, etc. resolve without redirects.
    Object.entries(friendlyRoutes).forEach(([route, filename]) => {
      const source = path.join(pagesDir, filename)
      if (!fs.existsSync(source)) return

      const targetDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''))
      fs.mkdirSync(targetDir, { recursive: true })
      const targetPath = path.join(targetDir, 'index.html')
      fs.copyFileSync(source, targetPath)
    })

    // Ensure Netlify-style redirects file is present in the final bundle.
    const redirectsSrc = path.resolve(__dirname, 'public/_redirects')
    const redirectsDest = path.join(distDir, '_redirects')
    if (fs.existsSync(redirectsSrc)) {
      fs.copyFileSync(redirectsSrc, redirectsDest)
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveFriendlyRoutes(), copyPagesToDist()],
})
