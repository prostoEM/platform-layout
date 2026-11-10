import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

import { uiKitViteConfig } from '../dev/uiKitVite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
  docs: { autodocs: true },
  typescript: { reactDocgen: 'react-docgen-typescript' },
  viteFinal: (config) => mergeConfig(config, uiKitViteConfig),
};

export default config;
