import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ═══════════════════════════════════════
  // BUILD – Optimisations SEO & performance
  // ═══════════════════════════════════════
  build: {
    // Minification maximale
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // Supprime les console.log en prod
        drop_debugger: true,
      },
    },

    // Code splitting intelligent
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer React du code applicatif → meilleur cache
          vendor: ['react', 'react-dom'],
        },
        // Nommage avec hash pour cache-busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },

    // Taille cible des chunks pour performance
    chunkSizeWarningLimit: 500,

    // Génération sourcemaps désactivée en prod (sécurité + taille)
    sourcemap: false,

    // CSS inlinée si < 4kb (évite 1 requête réseau)
    cssCodeSplit: true,

    // Cible moderne (réduit la taille du bundle)
    target: 'es2015',
  },

  // ═══════════════════════════════════════
  // SERVEUR DE DEV
  // ═══════════════════════════════════════
  server: {
    port: 5173,
    open: true,
  },

  // ═══════════════════════════════════════
  // OPTIMISATION DES DÉPENDANCES
  // ═══════════════════════════════════════
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
