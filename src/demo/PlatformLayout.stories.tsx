import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { LayoutDemo } from './LayoutDemo';
import { previewIcons } from '../../dev/previewIcons';

const meta = {
  title: 'Платформа/Общий лейаут',
  component: LayoutDemo,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  args: {
    ...previewIcons,
    initialProduct: 'spfi',
    defaultNavigationCollapsed: false,
    defaultRightPanelOpen: false,
    longContent: false,
  },
  argTypes: {
    brandIcon: { control: false },
    filterIcon: { control: false },
    initialProduct: { control: 'select', options: ['spfi', 'profile', 'incidents', 'tasks'] },
  },
  render: (args) => (
    <LayoutDemo key={`${args.initialProduct}-${args.defaultNavigationCollapsed}-${args.defaultRightPanelOpen}`} {...args} />
  ),
} satisfies Meta<typeof LayoutDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'СПФИ · основной сценарий' };
export const Collapsed: Story = {
  name: 'Свёрнутая навигация',
  args: { defaultNavigationCollapsed: true },
};
export const Filters: Story = {
  name: 'Инциденты · открытые фильтры',
  args: { initialProduct: 'incidents', defaultRightPanelOpen: true },
};
export const NoPanel: Story = {
  name: 'Профиль · без фильтров',
  args: { initialProduct: 'profile' },
};
export const WideContent: Story = {
  name: 'Широкий контент · 1440 × 900',
  args: { defaultRightPanelOpen: true, longContent: true },
  parameters: { viewport: { defaultViewport: 'laptop' } },
};
