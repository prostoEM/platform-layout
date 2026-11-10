import { fileURLToPath } from 'node:url';
import type { UserConfig } from 'vite';

const localPath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export const uiKitViteConfig: UserConfig = {
  resolve: {
    alias: {
      '@frontend/ui-kit': localPath('./ui-kit.ts'),
      '@frontend/styles': localPath('../local-ui-kit/ui-kit/src/lib/__styles__'),
      '@assets': localPath('../local-ui-kit/ui-kit/src/assets'),
    },
    dedupe: ['react', 'react-dom', 'classnames', 'date-fns'],
  },
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
};
