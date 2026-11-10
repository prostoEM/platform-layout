import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Icon } from '@frontend/icon';
import {
  Button, ButtonType, Flex, FlexAlign, FlexJustify, FlexWrap, H,
  Surface, SurfaceBackground, Tag, TagColor, TagSize, Text, TypographyType,
} from '@frontend/ui-kit';

import { AccessibleButton } from '../PlatformLayout/ui/AccessibleButton.ui';
import { DemoRecordDetail, RecordRisk, RecordStatus } from './DemoRecordDetail';
import type { DetailTab } from './DemoRecordDetail';
import type { DemoFilterValues } from './DemoFilters';
import { dateFormat, normalize, records } from './spfiDemoData';
import type { Status } from './spfiDemoData';
import cn from './LayoutDemo.module.scss';

interface RegistryProps {
  filters: DemoFilterValues;
  search: string;
  status: Status | 'all';
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onReset: () => void;
}

export function DemoRegistry({ filters, search, status, selectedId, onSelect, onReset }: RegistryProps) {
  const [tabs, setTabs] = useState<Record<string, DetailTab>>({});
  const [minimized, setMinimized] = useState<string[]>([]);
  const selectedButton = useRef<HTMLButtonElement | null>(null);
  const query = normalize(search);
  const visible = records.filter((entry) => (
    (!query || normalize(`${entry.id} ${entry.name}`).includes(query))
    && (status === 'all' || status === entry.status)
    && (!filters.applicant.length || filters.applicant.includes(entry.applicant))
    && (!filters.risk.length || filters.risk.includes(entry.risk))
    && (!filters.office.length || filters.office.includes(entry.office))
    && (!filters.examiner || filters.examiner === entry.examiner)
    && (!filters.period.dateFrom || (entry.date && entry.date >= filters.period.dateFrom))
    && (!filters.period.dateTo || (entry.date && entry.date <= filters.period.dateTo))
  ));
  const selected = records.find((entry) => entry.id === selectedId);
  const index = visible.findIndex((entry) => entry.id === selectedId);

  function select(id: string) {
    setMinimized((previous) => previous.filter((value) => value !== id));
    onSelect(id);
  }

  function close() {
    selectedButton.current?.focus();
    onSelect(null);
  }

  function onListKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button[aria-expanded]'));
    const current = buttons.indexOf(event.target as HTMLButtonElement);
    if (current < 0) return;

    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1
      : current + (event.key === 'ArrowDown' ? 1 : -1);
    buttons[next]?.focus();
  }

  return (
    <div className={cn.registry}>
      {minimized.length > 0 && (
        <Flex className={cn.minimized} justifyContent={FlexJustify.START} flexWrap={FlexWrap.WRAP} gap={8}>
          <Text type={TypographyType.SECONDARY}>Свёрнутые</Text>
          {records.filter((entry) => minimized.includes(entry.id)).map((entry) => (
            <Flex key={entry.id} gap={4}>
              <Button type={ButtonType.SECONDARY} onClick={() => select(entry.id)}>{entry.name}</Button>
              <AccessibleButton type={ButtonType.TRANSPARENT}
                iconLeft={<Icon iconName="ic_18_close_medium" />} accessibleLabel={`Закрыть вкладку ${entry.name}`}
                onClick={() => setMinimized((previous) => previous.filter((id) => id !== entry.id))} />
            </Flex>
          ))}
        </Flex>
      )}
      <div className={cn.registryGrid} data-detail-open={Boolean(selected)}>
        <section className={cn.entryList} aria-label="Карточки реестра" onKeyDown={onListKeyDown}>
          <Flex alignItems={FlexAlign.CENTER} justifyContent={FlexJustify.SPACE_BETWEEN} gap={8}>
            <H level={4}>Заявки</H>
            <Text type={TypographyType.SECONDARY} dataTestId="entry-count">{visible.length}</Text>
          </Flex>
          {visible.length === 0 && (
            <Flex justifyContent={FlexJustify.START} flexWrap={FlexWrap.WRAP} gap={8}>
              <Text type={TypographyType.SECONDARY}>Заявки не найдены</Text>
              <Button type={ButtonType.TRANSPARENT} onClick={onReset}>Очистить поиск и фильтры</Button>
            </Flex>
          )}
          {visible.map((entry) => (
            <Surface key={entry.id} className={cn.entry} borderRadius={12} background={SurfaceBackground.TRANSPARENT1}
              data-selected={selected?.id === entry.id}>
              <AccessibleButton type={ButtonType.TRANSPARENT}
                accessibleLabel={`Открыть заявку ${entry.name}, ${entry.id}`}
                expanded={selected?.id === entry.id}
                buttonRef={selected?.id === entry.id ? selectedButton : undefined}
                iconRight={<Icon iconName="ic_18_chevron_right" />}
                onClick={() => select(entry.id)} isFullWidth>
                <span className={cn.entryTitle}>{entry.name}</span>
              </AccessibleButton>
              <div className={cn.entryFacts}>
                <Flex justifyContent={FlexJustify.START} flexWrap={FlexWrap.WRAP} gap={4}>
                  <RecordStatus entry={entry} />
                  <RecordRisk entry={entry} />
                  <Tag color={TagColor.CALM} size={TagSize.S}>{entry.applicant}</Tag>
                </Flex>
                {entry.date && <Text type={TypographyType.SECONDARY}>{dateFormat.format(entry.date)} · {entry.time} · {entry.office}</Text>}
                <Text type={TypographyType.SECONDARY}>{entry.id}</Text>
              </div>
            </Surface>
          ))}
        </section>
        {selected && (
          <DemoRecordDetail
            entry={selected}
            tab={tabs[selected.id] ?? 'study'}
            onTab={(tab) => setTabs((previous) => ({ ...previous, [selected.id]: tab }))}
            position={index < 0 ? 'Вне фильтра' : `${index + 1} / ${visible.length}`}
            onPrevious={index > 0 ? () => select(visible[index - 1].id) : undefined}
            onNext={index >= 0 && index < visible.length - 1 ? () => select(visible[index + 1].id) : undefined}
            onMinimize={() => { setMinimized((previous) => [...previous, selected.id]); close(); }}
            onClose={close}
          />
        )}
      </div>
    </div>
  );
}
