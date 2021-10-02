import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
const path = require('path')

// https://vitejs.dev/config/
module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'scripts/build.js'),
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          vue: 'React'
        }
      }
    }
  },
  plugins: [react()]
})