import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon-32x32.png', 'favicon-16x16.png'],
    //   manifest: {
    //     name: 'YouRL',
    //     short_name: 'YouRL',
    //     description: 'URL Shortening Application',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: '/android-chrome-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: '/android-chrome-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       },
    //       {
    //         src: '/android-chrome-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any'
    //       },
    //       {
    //         src: '/android-chrome-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'maskable'
    //       }
    //     ]
    //   },
    //   registerType: 'autoUpdate',
    //   injectRegister: 'auto',
    //   workbox: {
    //   globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    //   }
    // })
  ],
  server: {
    port: 5179,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
// Need to add VitePWA plugin