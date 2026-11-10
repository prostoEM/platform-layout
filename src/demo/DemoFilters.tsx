import { useState } from 'react';

import {
  Button, ButtonNativeType, ButtonType, Checkbox, DatepickerInterval, Flex,
  FlexDirection, FlexAlign, FlexJustify, Select, TextInput, TextInputSize,
} from '@frontend/ui-kit';
import type { DatepickerDateInterval } from '@frontend/ui-kit';

interface Filters {
  query: string;
  status: string;
  category: string;
  period: DatepickerDateInterval;
  activeOnly: boolean;
}

const emptyFilters: Filters = {
  query: '',
  status: '',
  category: '',
  period: { dateFrom: null, dateTo: null },
  activeOnly: false,
};

const statuses = [
  { value: 'new', label: 'Новая' },
  { value: 'active', label: 'В работе' },
  { value: 'done', label: 'Завершена' },
];

const categories = [
  { value: 'planned', label: 'Плановая' },
  { value: 'incoming', label: 'Входящая' },
];

export function DemoFilters({ onApply }: { onApply: (count: number) => void }) {
  const [draft, setDraft] = useState(emptyFilters);
  const { query, status, category, period, activeOnly } = draft;

  function reset() {
    setDraft(emptyFilters);
    onApply(0);
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      onApply([query.trim(), status, category, period.dateFrom || period.dateTo, activeOnly].filter(Boolean).length);
    }}>
      <Flex direction={FlexDirection.COLUMN} alignItems={FlexAlign.STRETCH} gap={16}>
        <TextInput label="Поиск" placeholder="Введите запрос" size={TextInputSize.S}
          value={query} onChange={(event) => setDraft({ ...draft, query: event.target.value })} isFullWidth />
        <Select label="Статус" placeholder="Любой статус" options={statuses} value={status}
          isFullWidth isFullWidthMenu onChange={(value) => setDraft({ ...draft, status: String(value) })} />
        <Select label="Категория" placeholder="Любая категория" options={categories} value={category}
          isFullWidth isFullWidthMenu onChange={(value) => setDraft({ ...draft, category: String(value) })} />
        <DatepickerInterval label="Период" size={TextInputSize.S} isFullWidth
          selectedInterval={period} onChange={(value) => setDraft({ ...draft, period: value })} />
        <Flex justifyContent={FlexJustify.START}>
          <Checkbox isChecked={activeOnly} onChange={({ isChecked }) => setDraft({ ...draft, activeOnly: isChecked })}>
            Только активные
          </Checkbox>
        </Flex>
        <Flex justifyContent={FlexJustify.END} gap={8}>
          <Button type={ButtonType.SECONDARY} onClick={reset}>Сбросить</Button>
          <Button nativeType={ButtonNativeType.SUBMIT}>Применить</Button>
        </Flex>
      </Flex>
    </form>
  );
}
