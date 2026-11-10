import { useState } from 'react';
import type { ReactNode } from 'react';

import { Icon } from '@frontend/icon';
import { Surface, SurfaceBackground, Text, TextInput, TextInputSize, TypographyType } from '@frontend/ui-kit';

import { PlatformLayout } from '../PlatformLayout';
import { DemoFilters, emptyFilters } from './DemoFilters';
import { DemoRegistry } from './DemoRegistry';
import { DemoServiceNavigation } from './DemoServiceNavigation';
import { services } from './demoServices';
import type { ServiceId } from './demoServices';
import cn from './LayoutDemo.module.scss';

export interface LayoutDemoProps {
  brandIcon: ReactNode;
  filterIcon: ReactNode;
  navigationIcon?: ReactNode;
  initialProduct?: ServiceId;
  defaultNavigationCollapsed?: boolean;
  defaultRightPanelOpen?: boolean;
  longContent?: boolean;
}

export function LayoutDemo({
  brandIcon,
  filterIcon,
  navigationIcon,
  initialProduct = 'spfi',
  defaultNavigationCollapsed = false,
  defaultRightPanelOpen = false,
  longContent = false,
}: LayoutDemoProps) {
  const [product, setProduct] = useState(initialProduct);
  const [serviceQuery, setServiceQuery] = useState('');
  const [panelOpen, setPanelOpen] = useState(defaultRightPanelOpen);
  const [filters, setFilters] = useState(emptyFilters);
  const { hasFilters } = services[product];
  const appliedCount = [
    filters.query.trim(), filters.status, filters.category,
    filters.period.dateFrom || filters.period.dateTo, filters.activeOnly,
  ].filter(Boolean).length;

  function selectProduct(next: ServiceId) {
    if (product === next) return;
    setProduct(next);
    setFilters(emptyFilters);
  }

  return (
    <PlatformLayout
      title="Реестр"
      defaultNavigationCollapsed={defaultNavigationCollapsed}
      actions={appliedCount > 0 && <Text type={TypographyType.SECONDARY}>Условий: {appliedCount}</Text>}
      navigation={{
        brand: { label: 'Внутренняя безопасность', icon: brandIcon },
        expandIcon: navigationIcon ?? <Icon iconName="ic_18_chevron_right" />,
        collapseIcon: navigationIcon ?? <Icon iconName="ic_18_chevron_left" />,
        search: (
          <TextInput
            aria-label="Поиск сервиса"
            placeholder="Поиск сервиса"
            size={TextInputSize.S}
            iconLeft={<Icon iconName="ic_18_Search" />}
            value={serviceQuery}
            onChange={(event) => setServiceQuery(event.target.value)}
            isFullWidth
          />
        ),
        render: (collapsed) => (
          <DemoServiceNavigation collapsed={collapsed} query={serviceQuery} selected={product} onSelect={selectProduct} />
        ),
      }}
      rightPanel={hasFilters ? {
        title: 'Фильтры',
        trigger: { label: 'Фильтры', icon: filterIcon },
        closeIcon: <Icon iconName="ic_18_close_medium" />,
        content: <DemoFilters key={product} onApply={setFilters} />,
        isOpen: panelOpen,
        onOpenChange: setPanelOpen,
      } : undefined}
    >
      <DemoRegistry key={product} filters={filters} />
      {longContent && (
        <Surface className={cn.stress} background={SurfaceBackground.TRANSPARENT1} borderRadius={16}>
          <Text>Широкий блок для проверки прокрутки</Text>
        </Surface>
      )}
    </PlatformLayout>
  );
}
