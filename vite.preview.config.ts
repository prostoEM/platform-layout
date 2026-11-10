import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

import { uiKitViteConfig } from './dev/uiKitVite';

export default defineConfig(mergeConfig(uiKitViteConfig, {
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'preview-static' },
}));
