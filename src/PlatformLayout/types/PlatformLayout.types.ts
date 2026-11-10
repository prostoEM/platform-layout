import type { ReactNode } from 'react';

export interface PlatformLayoutNavigation {
  label?: string;
  brand: { label: string; icon: ReactNode };
  expandIcon: ReactNode;
  collapseIcon: ReactNode;
  render: (isCollapsed: boolean) => ReactNode;
}

export interface PlatformLayoutPanel {
  title: string;
  trigger?: { label: string; icon?: ReactNode };
  closeIcon: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export interface PlatformLayoutProps {
  title: string;
  actions?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
  navigation: PlatformLayoutNavigation;
  rightPanel?: PlatformLayoutPanel;
  defaultNavigationCollapsed?: boolean;
  className?: string;
  dataTestId?: string;
}
