import type { Preview } from '@storybook/react';

import '../dev/theme.scss';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        desktop: { name: '1920 × 1080', styles: { width: '1920px', height: '1080px' } },
        laptop: { name: '1440 × 900', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
};

export default preview;
