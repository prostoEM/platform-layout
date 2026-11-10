import { useState } from 'react';
import type { ReactNode } from 'react';

import { Icon } from '@frontend/icon';
import {
  ButtonState, ButtonType, Flex, FlexAlign, FlexDirection, FlexJustify,
  H, Surface, SurfaceBackground, Text, TypographyType,
} from '@frontend/ui-kit';

import { PlatformLayout } from '../PlatformLayout';
import { AccessibleButton } from '../PlatformLayout/ui/AccessibleButton.ui';
import { DemoFilters } from './DemoFilters';
import cn from './LayoutDemo.module.scss';

const products = {
  spfi: { label: 'СПФИ', icon: 'ic_18_calendar', hasFilters: true },
  profile: { label: 'Профиль благонадёжности', icon: 'ic_24_user', hasFilters: false },
  incidents: { label: 'Инциденты', icon: 'ic_16_alert_triangle', hasFilters: true },
  tasks: { label: 'Задачи', icon: 'ic_18_check', hasFilters: false },
} as const;

type Product = keyof typeof products;
const productIds = Object.keys(products) as Product[];

export interface LayoutDemoProps {
  brandIcon: ReactNode;
  filterIcon: ReactNode;
  initialProduct?: Product;
  defaultNavigationCollapsed?: boolean;
  defaultRightPanelOpen?: boolean;
  longContent?: boolean;
}

export function LayoutDemo({
  brandIcon,
  filterIcon,
  initialProduct = 'spfi',
  defaultNavigationCollapsed = false,
  defaultRightPanelOpen = false,
  longContent = false,
}: LayoutDemoProps) {
  const [product, setProduct] = useState(initialProduct);
  const [panelOpen, setPanelOpen] = useState(defaultRightPanelOpen);
  const [appliedCount, setAppliedCount] = useState(0);
  const { label, hasFilters } = products[product];

  function selectProduct(next: Product) {
    if (product === next) return;
    setProduct(next);
    setPanelOpen(false);
    setAppliedCount(0);
  }

  return (
    <PlatformLayout
      title={label}
      defaultNavigationCollapsed={defaultNavigationCollapsed}
      actions={appliedCount > 0 && <Text type={TypographyType.SECONDARY}>Условий: {appliedCount}</Text>}
      navigation={{
        brand: { label: 'Внутренняя безопасность', icon: brandIcon },
        expandIcon: <Icon iconName="ic_18_chevron_right" />,
        collapseIcon: <Icon iconName="ic_18_chevron_left" />,
        render: (collapsed) => (
          <div className={cn.menu} data-collapsed={collapsed}>
            {productIds.map((id) => (
              <AccessibleButton
                key={id}
                type={ButtonType.TRANSPARENT}
                state={product === id ? ButtonState.SELECTED : ButtonState.NORMAL}
                accessibleLabel={products[id].label}
                current={product === id}
                iconLeft={<Icon iconName={products[id].icon} />}
                onClick={() => selectProduct(id)}
                isFullWidth
              >
                <span className={cn.menuLabel}>{products[id].label}</span>
              </AccessibleButton>
            ))}
          </div>
        ),
      }}
      rightPanel={hasFilters ? {
        title: 'Фильтры',
        trigger: { label: 'Фильтры', icon: filterIcon },
        closeIcon: <Icon iconName="ic_18_close_medium" />,
        content: <DemoFilters key={product} onApply={setAppliedCount} />,
        isOpen: panelOpen,
        onOpenChange: setPanelOpen,
      } : undefined}
    >
      <Surface className={cn.center} background={SurfaceBackground.TRANSPARENT1} borderRadius={16}>
        <Flex className={cn.placeholder} direction={FlexDirection.COLUMN} alignItems={FlexAlign.CENTER}
          justifyContent={FlexJustify.CENTER} gap={8}>
          <H level={2}>Тут продукт</H>
          <Text type={TypographyType.SECONDARY}>{label}</Text>
        </Flex>
      </Surface>
      {longContent && (
        <Surface className={cn.stress} background={SurfaceBackground.TRANSPARENT1} borderRadius={16}>
          <Text>Широкий блок для проверки прокрутки</Text>
        </Surface>
      )}
    </PlatformLayout>
  );
}
