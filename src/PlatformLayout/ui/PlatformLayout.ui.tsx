import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { Flex, FlexJustify, FlexWrap, NativeButton } from '@frontend/ui-kit';

import type { PlatformLayoutProps } from '../types/PlatformLayout.types';
import cn from './PlatformLayout.module.scss';

export function PlatformLayout({
  title,
  actions,
  children,
  navigation,
  rightPanel,
  defaultNavigationCollapsed = false,
  defaultRightPanelOpen = false,
  className,
  dataTestId = 'platformLayout',
}: PlatformLayoutProps) {
  const id = useId();
  const [isNavigationCollapsed, setNavigationCollapsed] = useState(defaultNavigationCollapsed);
  const [isPanelOpen, setPanelOpen] = useState(defaultRightPanelOpen);
  const panelTrigger = useRef<HTMLButtonElement>(null);

  const navigationLabel = navigation.label ?? 'Левая область';
  const panelOpen = !!rightPanel && isPanelOpen;
  const navigationAction = isNavigationCollapsed ? 'Развернуть' : 'Свернуть';

  function closePanel() {
    setPanelOpen(false);
    panelTrigger.current?.focus();
  }

  function onPanelKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && !event.defaultPrevented) {
      event.preventDefault();
      closePanel();
    }
  }

  return (
    <div
      className={className ? `${cn.layout} ${className}` : cn.layout}
      data-testid={dataTestId}
      data-compact={isNavigationCollapsed}
      data-panel-open={panelOpen}
    >
      <aside className={cn.navigation} aria-label={navigationLabel}>
        <div className={cn.brand}>
          {isNavigationCollapsed
            ? <abbr title="Внутренняя безопасность">ВБ</abbr>
            : 'Внутренняя безопасность'}
        </div>

        <NativeButton
          className={cn.control}
          aria-label={`${navigationAction} левую область`}
          aria-expanded={!isNavigationCollapsed}
          aria-controls={`${id}-navigation`}
          title={`${navigationAction} левую область`}
          onClick={() => setNavigationCollapsed(!isNavigationCollapsed)}
        >
          {isNavigationCollapsed ? 'Меню' : navigationAction}
        </NativeButton>

        <div
          id={`${id}-navigation`}
          className={cn.navigationBody}
          tabIndex={isNavigationCollapsed ? undefined : 0}
          aria-label={navigationLabel}
        >
          {isNavigationCollapsed ? navigation.compact : navigation.expanded}
        </div>
      </aside>

      <header className={cn.header}>
        <h1 title={title}>{title}</h1>
        {(actions || rightPanel) && (
          <Flex className={cn.actions} justifyContent={FlexJustify.END} flexWrap={FlexWrap.WRAP} gap={8}>
            {actions}
            {rightPanel && (
              <NativeButton
                ref={panelTrigger}
                className={cn.control}
                aria-expanded={panelOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setPanelOpen(!panelOpen)}
              >
                {rightPanel.triggerLabel ?? rightPanel.title}
              </NativeButton>
            )}
          </Flex>
        )}
      </header>

      <main className={cn.content} tabIndex={0} aria-label="Основная область">
        {children}
      </main>

      {rightPanel && (
        <aside
          id={`${id}-panel`}
          className={cn.rightPanel}
          hidden={!panelOpen}
          aria-labelledby={`${id}-panel-title`}
          onKeyDown={onPanelKeyDown}
        >
          <div className={cn.panelHeader}>
            <h2 id={`${id}-panel-title`}>{rightPanel.title}</h2>
            <NativeButton className={cn.control} aria-label="Закрыть правую панель" onClick={closePanel}>
              Закрыть
            </NativeButton>
          </div>
          <div className={cn.panelBody} tabIndex={0} aria-label={rightPanel.title}>
            {rightPanel.content}
          </div>
        </aside>
      )}
    </div>
  );
}
