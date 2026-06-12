import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const deployTarget =
  process.env.DEPLOY_TARGET ??
  (process.env.NETLIFY === 'true' ? 'netlify' : 'vercel')

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    deployTarget === 'netlify' ? netlify() : nitro(),
    viteReact(),
  ],
})

export default config
