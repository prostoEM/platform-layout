import { Icon } from '@frontend/icon';
import { ButtonType, Text, TextSize, TypographyType } from '@frontend/ui-kit';

import { AccessibleButton } from '../PlatformLayout/ui/AccessibleButton.ui';
import { favoriteServices, otherServices, services } from './demoServices';
import type { ServiceId } from './demoServices';
import cn from './LayoutDemo.module.scss';

interface DemoServiceNavigationProps {
  collapsed: boolean;
  selected?: ServiceId;
  query: string;
  onSelect: (id: ServiceId) => void;
}

export function DemoServiceNavigation({ collapsed, selected, query, onSelect }: DemoServiceNavigationProps) {
  const normalizedQuery = collapsed ? '' : query.trim().toLocaleLowerCase('ru');

  const groups = [
    { label: 'Избранное', entries: favoriteServices },
    { label: 'Сервисы', entries: otherServices },
  ].map((group) => ({
    ...group,
    entries: group.entries.filter((id) => services[id].label.toLocaleLowerCase('ru').includes(normalizedQuery)),
  })).filter(({ entries }) => entries.length > 0);

  return (
    <div className={cn.serviceList} data-collapsed={collapsed}>
      {groups.length === 0 && <Text type={TypographyType.SECONDARY}>Сервисы не найдены</Text>}
      {groups.map(({ label, entries }) => (
        <section key={label} aria-label={label} className={cn.serviceGroup}>
          {!collapsed && <Text size={TextSize.S} type={TypographyType.SECONDARY} bold>{label}</Text>}
          {entries.map((id) => (
            <AccessibleButton
              key={id}
              type={ButtonType.TRANSPARENT}
              accessibleLabel={services[id].label}
              current={selected === id}
              iconLeft={<Icon iconName={services[id].icon} width={18} height={18} />}
              onClick={() => onSelect(id)}
              isFullWidth
            >
              <span className={cn.serviceTitle}>
                <span className={cn.menuLabel}>{services[id].label}</span>
                {!collapsed && favoriteServices.includes(id) && (
                  <span className={cn.favoriteStar}><Icon iconName="ic_18_star" width={14} height={14} /></span>
                )}
              </span>
            </AccessibleButton>
          ))}
        </section>
      ))}
    </div>
  );
}
