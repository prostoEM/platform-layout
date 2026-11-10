import { useId } from 'react';
import type { SVGProps } from 'react';

// Standalone demo bridge for the sibling icon library absent from ui-kit.zip.
export type IconName = string;
export enum IconColorType {
  BASE, CRITICAL, INFO, PRIMARY, SBER, SECONDARY, SUCCESS, TERTIARY, WARNING, WHITE,
}

const paths: Record<string, string> = {
  'preview-shield': 'M12 3 4 6v5c0 5 3 8 8 10 5-2 8-5 8-10V6z M9 12l2 2 4-4',
  'preview-filter': 'M4 6h16l-6 7v5l-4 2v-7z',
  calendar: 'M5 5h14v15H5z M5 9h14 M8 3v4 M16 3v4 M8 13h2m4 0h2m-8 3h2',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 20a8 8 0 0 1 16 0',
  alert_triangle: 'M12 3 2.5 20h19z M12 9v4m0 3v.2',
  check: 'm5 12 4 4 10-10',
  minus: 'M6 12h12',
  chevron_left: 'm14 6-6 6 6 6',
  chevron_right: 'm10 6 6 6-6 6',
  chevron_up: 'm6 15 6-6 6 6',
  chevron_down: 'm6 9 6 6 6-6',
  close_medium: 'm6 6 12 12M18 6 6 18',
  close_small: 'm7 7 10 10M17 7 7 17',
  filled_x_circle: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M9 9l6 6m0-6-6 6',
  search: 'M10 17a7 7 0 1 1 0-14 7 7 0 0 1 0 14z m5 0 5 5',
  star: 'm12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z',
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'type'> {
  iconName: IconName;
  type?: IconColorType;
  dataTestId?: string;
}

export function Icon({ iconName, type, dataTestId, ...props }: IconProps) {
  const size = Number(iconName.match(/^ic_(\d+)_/)?.[1] ?? 18);
  const name = iconName.replace(/^ic_\d+_/, '').toLowerCase();
  const color = type === IconColorType.SECONDARY ? 'var(--TextAndIconsSecondary)' : undefined;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color ?? 'currentColor'} strokeWidth="1.6" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" data-testid={dataTestId} {...props}>
      <path d={paths[name]} />
    </svg>
  );
}

export const useUniqueId = (prefix: string) => prefix + useId();
export const getFillValue = (id: string) => `url(#${id})`;
