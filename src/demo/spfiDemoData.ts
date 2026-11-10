import { TagType } from '@frontend/ui-kit';

export const statuses = {
  new: { label: 'Новое', type: TagType.DEFAULT },
  work: { label: 'В работе', type: TagType.PRIMARY },
  wait: { label: 'На ожидании', type: TagType.WARNING },
  done: { label: 'Завершено', type: TagType.SUCCESS },
  denied: { label: 'Отказано', type: TagType.CRITICAL },
} as const;

export type Status = keyof typeof statuses;
export type Applicant = 'Сотрудник' | 'Внешний кандидат';
export type Risk = 'found' | 'clear' | 'unknown';

interface Seed {
  name: string;
  status: Status;
  applicant: Applicant;
  risk: Risk;
  day?: number;
  time?: string;
  extra?: string[];
}

const seeds: readonly Seed[] = [
  { name: 'Анна Воронова', status: 'done', applicant: 'Сотрудник', risk: 'found', day: 12, time: '15:00' },
  { name: 'Алексей Миронов', status: 'work', applicant: 'Внешний кандидат', risk: 'unknown', day: 13, time: '10:30', extra: ['Аутсорс'] },
  { name: 'Михаил Орлов', status: 'done', applicant: 'Внешний кандидат', risk: 'clear', day: 13, time: '13:00', extra: ['Отложенное СПФИ', 'Аутсорс'] },
  { name: 'Артём Соколов', status: 'denied', applicant: 'Внешний кандидат', risk: 'unknown' },
  { name: 'Александра Волкова', status: 'done', applicant: 'Сотрудник', risk: 'found', day: 14, time: '09:30' },
  { name: 'Дмитрий Лебедев', status: 'work', applicant: 'Сотрудник', risk: 'unknown', day: 14, time: '12:00', extra: ['Отложенное СПФИ'] },
  { name: 'Полина Романова', status: 'done', applicant: 'Внешний кандидат', risk: 'clear', day: 15, time: '16:00' },
  { name: 'Иван Тихонов', status: 'new', applicant: 'Сотрудник', risk: 'unknown' },
  { name: 'Виктория Белова', status: 'done', applicant: 'Внешний кандидат', risk: 'found', day: 16, time: '11:45', extra: ['Аутсорс'] },
  { name: 'Анна Горина', status: 'denied', applicant: 'Внешний кандидат', risk: 'unknown' },
  { name: 'Константин Захаров', status: 'wait', applicant: 'Сотрудник', risk: 'unknown', day: 17, time: '15:00' },
  { name: 'Елена Демидова', status: 'done', applicant: 'Внешний кандидат', risk: 'clear', day: 18, time: '09:00' },
];

export const offices = ['Офис «Север»', 'Офис «Запад»', 'Офис «Центр»', 'Офис «Восток»'];
export const examiners = ['Антонов В. М.', 'Демидова Е. С.'];
export const riskLabels: Record<Risk, string> = {
  found: 'Риски выявлены', clear: 'Риски не выявлены', unknown: 'Нет данных',
};

export const records = seeds.map((seed, index) => ({
  ...seed,
  id: `2609-000${241 + index}-01-СПФИ`,
  created: '09.09.2026',
  date: seed.day ? new Date(2026, 8, seed.day) : null,
  office: seed.day ? offices[index % offices.length] : '',
  examiner: seed.day ? examiners[index % examiners.length] : '',
  author: ['Белова Т. А.', 'Ларин А. В.', 'Горина М. Е.'][index % 3],
}));

export type RecordEntry = typeof records[number];
export const dateFormat = new Intl.DateTimeFormat('ru-RU');
export const normalize = (value: string) => value.trim().toLocaleLowerCase('ru').replaceAll('ё', 'е');
