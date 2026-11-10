export const services = {
  spfi: { label: 'СПФИ', icon: 'ic_18_calendar', hasFilters: true },
  profile: { label: 'Профиль благонадёжности', icon: 'ic_24_user', hasFilters: false },
  incidents: { label: 'Инциденты', icon: 'ic_16_alert_triangle', hasFilters: true },
  tasks: { label: 'Задачи', icon: 'ic_18_check', hasFilters: false },
  requests: { label: 'Обращения', icon: 'ic_36_default_file', hasFilters: true },
  access: { label: 'Проверка доступов', icon: 'ic_16_lock', hasFilters: true },
  partners: { label: 'Контрагенты', icon: 'ic_24_user', hasFilters: true },
  monitoring: { label: 'Мониторинг', icon: 'ic_18_clock', hasFilters: true },
  reports: { label: 'Отчёты', icon: 'ic_36_default_file', hasFilters: false },
  alerts: { label: 'Оповещения', icon: 'ic_16_alert_triangle', hasFilters: false },
  calendar: { label: 'Календарь проверок', icon: 'ic_18_calendar', hasFilters: false },
  archive: { label: 'Архив проверок', icon: 'ic_36_default_file', hasFilters: true },
} as const;

export type ServiceId = keyof typeof services;
export const favoriteServices: readonly ServiceId[] = ['spfi', 'profile'];
export const otherServices = (Object.keys(services) as ServiceId[])
  .filter((id) => !favoriteServices.includes(id));
