import { useRef, useState } from 'react';

import { Icon } from '@frontend/icon';
import {
  ButtonForm, ButtonType, Flex, FlexAlign, FlexJustify, FlexWrap, H,
  Surface, SurfaceBackground, Tag, TagColor, TagSize, TagType, Text, TypographyType,
} from '@frontend/ui-kit';

import { AccessibleButton } from '../PlatformLayout/ui/AccessibleButton.ui';
import type { DemoFilterValues } from './DemoFilters';
import cn from './LayoutDemo.module.scss';

const statuses = {
  new: { label: 'Новая', type: TagType.DEFAULT },
  active: { label: 'В работе', type: TagType.PRIMARY },
  done: { label: 'Завершена', type: TagType.SUCCESS },
} as const;

const categories = { planned: 'Плановая', incoming: 'Входящая' } as const;

interface RegistryEntry {
  id: string;
  title: string;
  status: keyof typeof statuses;
  category: keyof typeof categories;
  updated: Date;
  description: string;
}

const entries: readonly RegistryEntry[] = [
  { id: '0241', title: 'Плановая проверка подразделения', status: 'active', category: 'planned', updated: new Date(2026, 10, 10), description: 'Собираем материалы для плановой проверки. Следующий шаг — сверить комплект документов и зафиксировать результаты.' },
  { id: '0240', title: 'Проверка по обращению', status: 'new', category: 'incoming', updated: new Date(2026, 10, 9), description: 'Заявка поступила на первичную проверку.' },
  { id: '0239', title: 'Дополнительная сверка данных', status: 'active', category: 'incoming', updated: new Date(2026, 10, 9), description: 'Часть данных требует дополнительного подтверждения.' },
  { id: '0238', title: 'Проверка материалов', status: 'done', category: 'planned', updated: new Date(2026, 10, 6), description: 'Проверка завершена, материалы переданы в архив.' },
  { id: '0237', title: 'Контроль изменений', status: 'new', category: 'planned', updated: new Date(2026, 10, 5), description: 'Требуется сверить изменения за отчётный период.' },
  { id: '0236', title: 'Проверка по запросу', status: 'done', category: 'incoming', updated: new Date(2026, 10, 4), description: 'Результаты проверки зафиксированы в карточке.' },
];

const dateFormat = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

export function DemoRegistry({ filters }: { filters: DemoFilterValues }) {
  const [selectedId, setSelectedId] = useState<string | null>(entries[0].id);
  const selectedButton = useRef<HTMLButtonElement | null>(null);
  const query = filters.query.trim().toLocaleLowerCase('ru');
  const visible = entries.filter((entry) => (
    (!query || `${entry.id} ${entry.title}`.toLocaleLowerCase('ru').includes(query))
    && (!filters.status || filters.status === entry.status)
    && (!filters.category || filters.category === entry.category)
    && (!filters.activeOnly || entry.status !== 'done')
    && (!filters.period.dateFrom || entry.updated >= filters.period.dateFrom)
    && (!filters.period.dateTo || entry.updated <= filters.period.dateTo)
  ));
  const selected = visible.find((entry) => entry.id === selectedId);

  return (
    <div className={cn.registry}>
      <div className={cn.registryGrid} data-detail-open={Boolean(selected)}>
        <section className={cn.entryList} aria-label="Карточки реестра">
          <Flex alignItems={FlexAlign.CENTER} justifyContent={FlexJustify.SPACE_BETWEEN} gap={8}>
            <H level={4}>Карточки</H>
            <Text type={TypographyType.SECONDARY} dataTestId="entry-count">{visible.length}</Text>
          </Flex>
          {visible.length === 0 && <Text type={TypographyType.SECONDARY}>Карточки не найдены</Text>}
          {visible.map((entry) => (
            <Surface key={entry.id} className={cn.entry} borderRadius={12} background={SurfaceBackground.TRANSPARENT1}
              data-selected={selected?.id === entry.id}>
              <AccessibleButton
                type={ButtonType.TRANSPARENT}
                accessibleLabel={`Открыть карточку ${entry.id}: ${entry.title}`}
                expanded={selected?.id === entry.id}
                buttonRef={selected?.id === entry.id ? selectedButton : undefined}
                iconRight={<Icon iconName="ic_18_chevron_right" />}
                onClick={() => setSelectedId(entry.id)}
                isFullWidth
              >
                <span className={cn.entryTitle}>{entry.title}</span>
              </AccessibleButton>
              <div className={cn.entryMeta}>
                <Text type={TypographyType.SECONDARY}>№ {entry.id}</Text>
                <Tag size={TagSize.S} color={TagColor.CALM} type={statuses[entry.status].type}>
                  {statuses[entry.status].label}
                </Tag>
              </div>
            </Surface>
          ))}
        </section>
        {selected && (
          <Surface className={cn.detail} background={SurfaceBackground.FILL1} borderRadius={16}>
            <article aria-label="Открытая карточка" className={cn.detailBody}>
              <Flex justifyContent={FlexJustify.SPACE_BETWEEN} alignItems={FlexAlign.CENTER} gap={8}>
                <Text type={TypographyType.SECONDARY}>Карточка № {selected.id}</Text>
                <AccessibleButton
                  type={ButtonType.TRANSPARENT}
                  form={ButtonForm.RECT}
                  iconLeft={<Icon iconName="ic_18_close_medium" />}
                  accessibleLabel="Закрыть карточку"
                  onClick={() => {
                    selectedButton.current?.focus();
                    setSelectedId(null);
                  }}
                />
              </Flex>
              <H level={2}>{selected.title}</H>
              <Flex justifyContent={FlexJustify.START} flexWrap={FlexWrap.WRAP} gap={8}>
                <Tag size={TagSize.S} color={TagColor.CALM} type={statuses[selected.status].type}>
                  {statuses[selected.status].label}
                </Tag>
                <Tag size={TagSize.S} color={TagColor.CALM}>{categories[selected.category]}</Tag>
              </Flex>
              <section className={cn.detailSection} aria-label="О проверке">
                <H level={4}>О проверке</H>
                <Text type={TypographyType.SECONDARY}>{selected.description}</Text>
              </section>
              <section className={cn.detailSection} aria-label="Обновление">
                <Text type={TypographyType.SECONDARY}>Последнее обновление</Text>
                <Text>{dateFormat.format(selected.updated)}</Text>
              </section>
            </article>
          </Surface>
        )}
      </div>
    </div>
  );
}
