import type { Meta, StoryObj } from '@storybook/react';

import { LayoutDemo } from './LayoutDemo';

const meta = {
  title: 'Платформа/Общий лейаут',
  component: LayoutDemo,
  parameters: { layout: 'fullscreen' },
  args: {
    defaultNavigationCollapsed: false,
    defaultRightPanelOpen: false,
    withRightPanel: false,
    longContent: false,
  },
  argTypes: {
    defaultNavigationCollapsed: { name: 'Левая область свёрнута при открытии' },
    defaultRightPanelOpen: { name: 'Правая панель открыта на широком экране' },
    withRightPanel: { name: 'Правая панель доступна' },
    longContent: { name: 'Длинный заголовок и широкий блок' },
  },
} satisfies Meta<typeof LayoutDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  name: 'Главная',
};

export const Collapsed: Story = {
  name: 'Свёрнутая левая область',
  args: { defaultNavigationCollapsed: true },
};

export const RightPanel: Story = {
  name: 'Правая панель',
  args: { withRightPanel: true },
};

export const WideContent: Story = {
  name: 'Широкий контент · 1440 × 900',
  args: { withRightPanel: true, defaultRightPanelOpen: true, longContent: true },
  parameters: { viewport: { defaultViewport: 'laptop' } },
};
