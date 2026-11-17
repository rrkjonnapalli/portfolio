import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import content from './src/content.json'

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Fills {{key}} placeholders in index.html from content.json, so the page title and share tags live with the rest of the copy.
function contentMeta(): Plugin {
  const values: Record<string, string> = {
    title: content.meta.title,
    description: content.meta.description,
    url: content.meta.url,
    siteName: content.masthead.title,
  }
  return {
    name: 'content-meta',
    transformIndexHtml: (html) =>
      html.replace(/\{\{(\w+)\}\}/g, (match, key: string) => (key in values ? escape(values[key]) : match)),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), contentMeta()],
})
