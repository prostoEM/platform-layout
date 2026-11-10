import { useState } from 'react';

import {
  Button, ButtonNativeType, ButtonType, DatepickerInterval, Flex,
  FlexDirection, FlexAlign, FlexJustify, Select, SelectMode, TextInputSize,
} from '@frontend/ui-kit';
import type { DatepickerDateInterval } from '@frontend/ui-kit';

import { examiners, offices, riskLabels } from './spfiDemoData';
import cn from './LayoutDemo.module.scss';

export interface DemoFilterValues {
  risk: string[];
  applicant: string[];
  office: string[];
  examiner: string;
  period: DatepickerDateInterval;
}

export const emptyFilters: DemoFilterValues = {
  risk: [], applicant: [], office: [], examiner: '', period: { dateFrom: null, dateTo: null },
};

const options = (values: string[]) => values.map((value) => ({ value, label: value }));
const riskOptions = Object.entries(riskLabels).map(([value, label]) => ({ value, label }));
const applicantOptions = options(['Сотрудник', 'Внешний кандидат']);
const officeOptions = options(offices);
const examinerOptions = options(examiners);

export function DemoFilters({ onApply }: { onApply: (filters: DemoFilterValues) => void }) {
  const [draft, setDraft] = useState(emptyFilters);

  function reset() {
    setDraft(emptyFilters);
    onApply(emptyFilters);
  }

  return (
    <form className={cn.filterForm} onSubmit={(event) => {
      event.preventDefault();
      onApply(draft);
    }}>
      <div className={cn.filterFields}>
        <Flex direction={FlexDirection.COLUMN} alignItems={FlexAlign.STRETCH} gap={16}>
          <Select label="Факторы риска" placeholder="Все значения" options={riskOptions} value={draft.risk}
            mode={SelectMode.MULTI} isFullWidth isFullWidthMenu
            onChange={(value) => setDraft({ ...draft, risk: Array.isArray(value) ? value : [] })} />
          <Select label="Тип заявителя" placeholder="Любой тип" options={applicantOptions} value={draft.applicant}
            mode={SelectMode.MULTI} isFullWidth isFullWidthMenu
            onChange={(value) => setDraft({ ...draft, applicant: Array.isArray(value) ? value : [] })} />
          <Select label="Место тестирования" placeholder="Любой офис" options={officeOptions} value={draft.office}
            mode={SelectMode.MULTI} isFullWidth isFullWidthMenu
            onChange={(value) => setDraft({ ...draft, office: Array.isArray(value) ? value : [] })} />
          <Select label="Полиграфолог" placeholder="Любой специалист" options={examinerOptions} value={draft.examiner}
            isAllowClear isFullWidth isFullWidthMenu
            onChange={(value) => setDraft({ ...draft, examiner: String(value) })} />
          <DatepickerInterval label="Дата тестирования" size={TextInputSize.S} isFullWidth
            selectedInterval={draft.period} onChange={(value) => setDraft({ ...draft, period: value })} />
        </Flex>
      </div>
      <footer className={cn.filterFooter}>
        <Flex justifyContent={FlexJustify.END} gap={8}>
          <Button type={ButtonType.SECONDARY} onClick={reset}>Сбросить</Button>
          <Button nativeType={ButtonNativeType.SUBMIT}>Применить</Button>
        </Flex>
      </footer>
    </form>
  );
}
