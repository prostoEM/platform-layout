import type { ReactNode } from 'react';

export interface PlatformLayoutNavigation {
  label?: string;
  expanded: ReactNode;
  compact?: ReactNode;
}

export interface PlatformLayoutPanel {
  title: string;
  triggerLabel?: string;
  content: ReactNode;
}

export interface PlatformLayoutProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  navigation: PlatformLayoutNavigation;
  rightPanel?: PlatformLayoutPanel;
  defaultNavigationCollapsed?: boolean;
  defaultRightPanelOpen?: boolean;
  className?: string;
  dataTestId?: string;
}
