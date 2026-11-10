import { useState } from 'react';
import type { ReactNode } from 'react';

import { Icon } from '@frontend/icon';
import {
  Button, ButtonState, ButtonType, Flex, FlexAlign, FlexJustify, FlexWrap,
  H, Surface, SurfaceBackground, Text, TextInput, TextInputSize, TextSize, TypographyType,
} from '@frontend/ui-kit';

import { PlatformLayout } from '../PlatformLayout';
import { DemoFilters, emptyFilters } from './DemoFilters';
import { DemoRegistry } from './DemoRegistry';
import { DemoServiceNavigation } from './DemoServiceNavigation';
import { services } from './demoServices';
import type { ServiceId } from './demoServices';
import { records, statuses } from './spfiDemoData';
import type { Status } from './spfiDemoData';
import cn from './LayoutDemo.module.scss';

const quickStatuses = ['all', ...Object.keys(statuses) as Status[]] as const;

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
  const [product, setProduct] = useState<ServiceId | 'home'>(initialProduct);
  const [serviceQuery, setServiceQuery] = useState('');
  const [recordQuery, setRecordQuery] = useState('');
  const [status, setStatus] = useState<Status | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(records[0].id);
  const [panelOpen, setPanelOpen] = useState(defaultRightPanelOpen);
  const [filters, setFilters] = useState(emptyFilters);
  const [filterVersion, setFilterVersion] = useState(0);
  const registry = product === 'spfi';
  const appliedCount = [
    filters.risk.length, filters.applicant.length, filters.office.length, filters.examiner,
    filters.period.dateFrom || filters.period.dateTo,
  ].filter(Boolean).length;

  function resetRegistry() {
    setRecordQuery('');
    setStatus('all');
    setFilters(emptyFilters);
    setFilterVersion((previous) => previous + 1);
  }

  function selectProduct(next: ServiceId | 'home') {
    if (product === next) return;
    setProduct(next);
    setSelectedId(null);
    resetRegistry();
  }

  const section = registry ? 'СПФИ реестр' : product === 'home' ? 'Главная' : services[product].label;
  const breadcrumb = (
    <nav aria-label="Путь" className={cn.breadcrumb}>
      {product === 'home' ? (
        <Text bold>Главная</Text>
      ) : (
        <>
          <Button type={ButtonType.TRANSPARENT} onClick={() => selectProduct('home')}>Главная</Button>
          <span aria-hidden="true">/</span>
          {registry && selectedId ? (
            <>
              <Button type={ButtonType.TRANSPARENT} onClick={() => setSelectedId(null)}>{section}</Button>
              <span aria-hidden="true">/</span>
              <span aria-current="page"><Text bold>{selectedId}</Text></span>
            </>
          ) : <span aria-current="page"><Text bold>{section}</Text></span>}
        </>
      )}
    </nav>
  );

  return (
    <PlatformLayout
      title={section}
      breadcrumb={breadcrumb}
      defaultNavigationCollapsed={defaultNavigationCollapsed}
      toolbar={registry && (
        <div className={cn.registryToolbar}>
          <TextInput aria-label="Поиск по ФИО или номеру заявки" placeholder="ФИО или номер заявки"
            size={TextInputSize.S} iconLeft={<Icon iconName="ic_18_Search" />}
            value={recordQuery} onChange={(event) => setRecordQuery(event.target.value)} isFullWidth />
          <Flex alignItems={FlexAlign.CENTER} justifyContent={FlexJustify.START} flexWrap={FlexWrap.WRAP} gap={4}>
            {quickStatuses.map((value) => (
              <Button key={value} type={ButtonType.TRANSPARENT}
                state={status === value ? ButtonState.SELECTED : ButtonState.NORMAL}
                onClick={() => setStatus(value)}>
                {value === 'all' ? 'Все' : statuses[value].label}
              </Button>
            ))}
          </Flex>
        </div>
      )}
      navigation={{
        brand: { label: 'Внутренняя безопасность', icon: brandIcon },
        expandIcon: navigationIcon ?? <Icon iconName="ic_18_chevron_right" />,
        collapseIcon: navigationIcon ?? <Icon iconName="ic_18_chevron_left" />,
        search: (
          <TextInput aria-label="Поиск сервиса" placeholder="Поиск сервиса"
            size={TextInputSize.S} iconLeft={<Icon iconName="ic_18_Search" />}
            value={serviceQuery} onChange={(event) => setServiceQuery(event.target.value)} isFullWidth />
        ),
        render: (collapsed) => (
          <DemoServiceNavigation collapsed={collapsed} query={serviceQuery}
            selected={product === 'home' ? undefined : product} onSelect={selectProduct} />
        ),
      }}
      rightPanel={registry ? {
        title: 'Фильтры',
        trigger: { label: appliedCount ? `Фильтры · ${appliedCount}` : 'Фильтры', icon: filterIcon, placement: 'toolbar' },
        closeIcon: <Icon iconName="ic_18_close_medium" />,
        content: <DemoFilters key={filterVersion} onApply={setFilters} />,
        isOpen: panelOpen,
        onOpenChange: setPanelOpen,
      } : undefined}
    >
      {registry ? (
        <DemoRegistry filters={filters} search={recordQuery} status={status}
          selectedId={selectedId} onSelect={setSelectedId} onReset={resetRegistry} />
      ) : (
        <Surface className={cn.detailBody} background={SurfaceBackground.FILL1} borderRadius={16}>
          <H level={2}>{section}</H>
          <Text size={TextSize.S} type={TypographyType.SECONDARY}>Демонстрационные заявки доступны в СПФИ.</Text>
          <Button onClick={() => selectProduct('spfi')}>Открыть реестр СПФИ</Button>
        </Surface>
      )}
      {longContent && (
        <Surface className={cn.stress} background={SurfaceBackground.TRANSPARENT1} borderRadius={16}>
          <Text>Широкий блок для проверки прокрутки</Text>
        </Surface>
      )}
    </PlatformLayout>
  );
}
