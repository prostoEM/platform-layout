import type { ReactNode } from 'react';
import { Icon } from '@frontend/icon';
import {
  ButtonForm, ButtonState, ButtonType, Flex, FlexAlign, FlexJustify, FlexWrap,
  H, Surface, SurfaceBackground, TabMenu, Tag, TagColor, TagSize, TagType, Text, TypographyType,
} from '@frontend/ui-kit';

import { AccessibleButton } from '../PlatformLayout/ui/AccessibleButton.ui';
import { dateFormat, riskLabels, statuses } from './spfiDemoData';
import type { RecordEntry } from './spfiDemoData';
import cn from './LayoutDemo.module.scss';

const tabs = [
  { value: 'study', label: 'Об исследовании' },
  { value: 'person', label: 'Данные о тестируемом' },
  { value: 'risk', label: 'Риск-темы' },
  { value: 'files', label: 'Материалы' },
] as const;

export type DetailTab = typeof tabs[number]['value'];

export function RecordStatus({ entry }: { entry: RecordEntry }) {
  const { label, type } = statuses[entry.status];
  return <Tag color={TagColor.CALM} size={TagSize.S} type={type}>{label}</Tag>;
}

export function RecordRisk({ entry }: { entry: RecordEntry }) {
  if (entry.risk === 'unknown') return null;
  return (
    <Tag color={TagColor.CALM} size={TagSize.S} type={entry.risk === 'found' ? TagType.CRITICAL : TagType.SUCCESS}>
      {riskLabels[entry.risk]}
    </Tag>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Surface className={cn.detailSection} background={SurfaceBackground.TRANSPARENT1} borderRadius={12}>
      <H level={4}>{title}</H>
      {children}
    </Surface>
  );
}

function Facts({ entries }: { entries: readonly (readonly [string, string])[] }) {
  return (
    <dl className={cn.facts}>
      {entries.map(([label, value]) => (
        <div key={label}>
          <dt><Text type={TypographyType.SECONDARY}>{label}</Text></dt>
          <dd><Text>{value || '—'}</Text></dd>
        </div>
      ))}
    </dl>
  );
}

function RiskRows({ entry }: { entry: RecordEntry }) {
  if (entry.risk === 'unknown') {
    return <Text type={TypographyType.SECONDARY}>{entry.status === 'denied'
      ? 'Исследование не проводилось.'
      : 'Результат появится после завершения исследования.'}</Text>;
  }
  return (
    <table className={cn.riskTable}>
      <thead><tr><th scope="col">Проверяемая тема</th><th scope="col">Полиграфолог</th><th scope="col">Сверка</th></tr></thead>
      <tbody>
        {['Анкетные данные', 'Конфликт интересов', 'Соблюдение внутренних правил', 'Дополнительные сведения'].map((theme, index) => {
          const flagged = entry.risk === 'found' && index === 1;
          return (
            <tr key={theme}>
              <td>{theme}</td>
              <td><Tag size={TagSize.S} color={TagColor.CALM} type={flagged ? TagType.CRITICAL : TagType.DEFAULT}>
                {flagged ? 'Отмечено' : 'Без отметок'}
              </Tag></td>
              <td><Text type={TypographyType.SECONDARY}>Сверено</Text></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TabContent({ entry, tab }: { entry: RecordEntry; tab: DetailTab }) {
  switch (tab) {
    case 'person':
      return <DetailSection title="Данные о тестируемом"><Facts entries={[
        ['ФИО', entry.name], ['Категория', entry.applicant], ['Номер заявки', entry.id], ['Автор заявки', entry.author],
      ]} /></DetailSection>;
    case 'risk':
      return <DetailSection title="Риск-темы"><RecordRisk entry={entry} /><RiskRows entry={entry} /></DetailSection>;
    case 'files':
      return <DetailSection title="Материалы"><Text type={TypographyType.SECONDARY}>В демонстрационных заявках вложений нет.</Text></DetailSection>;
    default:
      return (
        <>
          <DetailSection title="Об исследовании">
            <Facts entries={[
              ['Дата тестирования', entry.date ? dateFormat.format(entry.date) : ''],
              ['Время', entry.time ?? ''], ['Место проведения', entry.office], ['Полиграфолог', entry.examiner],
            ]} />
          </DetailSection>
          <DetailSection title="Проверочные вопросы">
            <Text type={TypographyType.SECONDARY}>{entry.status === 'done'
              ? 'Анкетные данные, рабочий опыт и обстоятельства проверки.'
              : 'Вопросы появятся после подготовки исследования.'}</Text>
          </DetailSection>
          <DetailSection title="Результат исследования"><RiskRows entry={entry} /></DetailSection>
        </>
      );
  }
}

interface DetailProps {
  entry: RecordEntry;
  tab: DetailTab;
  onTab: (tab: DetailTab) => void;
  position: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export function DemoRecordDetail({ entry, tab, onTab, position, onPrevious, onNext, onMinimize, onClose }: DetailProps) {
  return (
    <Surface className={cn.detail} background={SurfaceBackground.FILL1} borderRadius={16}>
      <article aria-label="Открытая карточка" className={cn.detailBody}>
        <Flex justifyContent={FlexJustify.SPACE_BETWEEN} alignItems={FlexAlign.CENTER} flexWrap={FlexWrap.WRAP} gap={8}>
          <Text type={TypographyType.SECONDARY}>{entry.id} · от {entry.created}</Text>
          <Flex alignItems={FlexAlign.CENTER} gap={4}>
            <AccessibleButton form={ButtonForm.RECT} type={ButtonType.TRANSPARENT} accessibleLabel="Предыдущая заявка"
              iconLeft={<Icon iconName="ic_18_chevron_left" />} onClick={onPrevious}
              state={onPrevious ? ButtonState.NORMAL : ButtonState.DISABLED} />
            <Text type={TypographyType.SECONDARY}>{position}</Text>
            <AccessibleButton form={ButtonForm.RECT} type={ButtonType.TRANSPARENT} accessibleLabel="Следующая заявка"
              iconLeft={<Icon iconName="ic_18_chevron_right" />} onClick={onNext}
              state={onNext ? ButtonState.NORMAL : ButtonState.DISABLED} />
            <AccessibleButton form={ButtonForm.RECT} type={ButtonType.TRANSPARENT} accessibleLabel="Свернуть карточку"
              iconLeft={<Icon iconName="ic_16_minus" />} onClick={onMinimize} />
            <AccessibleButton form={ButtonForm.RECT} type={ButtonType.TRANSPARENT} accessibleLabel="Закрыть карточку"
              iconLeft={<Icon iconName="ic_18_close_medium" />} onClick={onClose} />
          </Flex>
        </Flex>
        <H level={2}>{entry.name}</H>
        <Flex justifyContent={FlexJustify.START} flexWrap={FlexWrap.WRAP} gap={8}>
          <RecordStatus entry={entry} />
          <RecordRisk entry={entry} />
          <Tag size={TagSize.S} color={TagColor.CALM}>{entry.applicant}</Tag>
          {entry.extra?.map((label) => <Tag key={label} size={TagSize.S} color={TagColor.CALM}>{label}</Tag>)}
        </Flex>
        <TabMenu<DetailTab> tabList={[...tabs]} activeTab={tab} onChange={onTab} />
        <TabContent entry={entry} tab={tab} />
      </article>
    </Surface>
  );
}
