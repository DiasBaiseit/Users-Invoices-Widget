import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget/main.ts'),
      name: 'Widget',
      fileName: () => "widget.umd.js",
      formats: ['umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        name: 'Widget',
        globals: {
          vue: 'Vue'
        },
        inlineDynamicImports: true
      }
    }
  },
  define: {
    "process.env": {}
  }
})
