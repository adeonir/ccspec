import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  target: 'node20',
  outDir: 'dist',
  clean: true,
  minify: false,
  shims: true,
  loader: {
    '.md': 'text'
  },
  banner: {
    js: '#!/usr/bin/env node'
  }
})
