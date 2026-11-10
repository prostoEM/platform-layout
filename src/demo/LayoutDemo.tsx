import { useState } from 'react';

import { NativeButton } from '@frontend/ui-kit';

import { PlatformLayout } from '../PlatformLayout';
import cn from './LayoutDemo.module.scss';

export interface LayoutDemoProps {
  defaultNavigationCollapsed?: boolean;
  withRightPanel?: boolean;
  defaultRightPanelOpen?: boolean;
  longContent?: boolean;
}

export function LayoutDemo({
  defaultNavigationCollapsed = false,
  withRightPanel = false,
  defaultRightPanelOpen = false,
  longContent = false,
}: LayoutDemoProps) {
  const [showLabels, setShowLabels] = useState(true);

  return (
    <PlatformLayout
      key={`${defaultNavigationCollapsed}-${defaultRightPanelOpen}-${withRightPanel}`}
      title={longContent
        ? 'Рабочая область с длинным заголовком для проверки переноса рядом с открытой панелью'
        : 'Рабочая область'}
      defaultNavigationCollapsed={defaultNavigationCollapsed}
      defaultRightPanelOpen={defaultRightPanelOpen}
      actions={
        <>
          <span className={cn.demo}>Демонстрация</span>
          <NativeButton className={cn.action} aria-pressed={showLabels}
            onClick={() => setShowLabels(!showLabels)}>
            Подписи областей
          </NativeButton>
        </>
      }
      navigation={{
        expanded: (
          <div className={`${cn.placeholder} ${cn.left}`}>
            {showLabels && (
              <>
                <strong>Левая область</strong>
                <span>Слот навигации</span>
              </>
            )}
          </div>
        ),
      }}
      rightPanel={withRightPanel ? {
        title: 'Фильтры',
        content: (
          <div className={`${cn.placeholder} ${cn.panel}`}>
            {showLabels && (
              <>
                <strong>Правая область</strong>
                <span>Слот для будущих фильтров</span>
              </>
            )}
          </div>
        ),
      } : undefined}
    >
      <div className={`${cn.placeholder} ${cn.center}`}>
        {showLabels && (
          <>
            <strong>Центральная область</strong>
            <span>Слот для контента продукта</span>
          </>
        )}
      </div>
      {longContent && (
        <div className={`${cn.placeholder} ${cn.stress}`}>
          Блок 1200 × 920 px для проверки прокрутки центральной области
        </div>
      )}
    </PlatformLayout>
  );
}
