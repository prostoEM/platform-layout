import { useCallback, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import {
  ButtonForm, ButtonType, Flex, FlexAlign, FlexJustify, FlexWrap, H,
  Surface, SurfaceBackground, Text,
} from '@frontend/ui-kit';

import type { PlatformLayoutProps } from '../types/PlatformLayout.types';
import { AccessibleButton } from './AccessibleButton.ui';
import cn from './PlatformLayout.module.scss';

export function PlatformLayout({
  title,
  breadcrumb,
  actions,
  toolbar,
  children,
  navigation,
  rightPanel,
  defaultNavigationCollapsed = false,
  className,
  dataTestId = 'platformLayout',
}: PlatformLayoutProps) {
  const id = useId();
  const [collapsed, setCollapsed] = useState(defaultNavigationCollapsed);
  const panelTrigger = useRef<HTMLButtonElement | null>(null);
  const panelOpen = rightPanel?.isOpen ?? false;
  const panelRef = useCallback((panel: HTMLElement | null) => {
    if (panel) panel.inert = !panelOpen;
  }, [panelOpen]);

  function closePanel() {
    rightPanel?.onOpenChange(false);
    panelTrigger.current?.focus();
  }

  function onPanelKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && !event.defaultPrevented) {
      event.preventDefault();
      closePanel();
    }
  }

  const trigger = rightPanel?.trigger && (
    <AccessibleButton
      buttonRef={panelTrigger}
      type={rightPanel.trigger.placement === 'toolbar' && !panelOpen ? ButtonType.TRANSPARENT : ButtonType.SECONDARY}
      iconLeft={rightPanel.trigger.icon}
      expanded={panelOpen}
      controls={`${id}-panel`}
      onClick={() => rightPanel.onOpenChange(!panelOpen)}
    >
      {rightPanel.trigger.label}
    </AccessibleButton>
  );
  const triggerInToolbar = rightPanel?.trigger?.placement === 'toolbar';

  return (
    <div
      className={className ? `${cn.layout} ${className}` : cn.layout}
      data-testid={dataTestId}
      data-compact={collapsed}
      data-panel-open={panelOpen}
    >
      <aside className={cn.navigation} aria-label={navigation.label ?? 'Сервисы'}>
        <Surface className={cn.navigationSurface} background={SurfaceBackground.EMPTY} borderRadius={12}>
          <div className={cn.brand} aria-label={navigation.brand.label}>
            <span className={cn.brandIcon} aria-hidden="true">{navigation.brand.icon}</span>
            <div className={cn.brandLabel} aria-hidden={collapsed}>
              <Text bold>{navigation.brand.label}</Text>
            </div>
          </div>
          {!collapsed && navigation.search && (
            <div className={cn.navigationSearch}>{navigation.search}</div>
          )}
          <nav id={`${id}-navigation`} className={cn.navigationBody} aria-label="Навигация по сервисам">
            {navigation.render(collapsed)}
          </nav>
        </Surface>
      </aside>

      <header className={cn.header}>
        <Flex className={cn.heading} alignItems={FlexAlign.CENTER}
          justifyContent={FlexJustify.SPACE_BETWEEN} flexWrap={FlexWrap.WRAP} gap={16}>
          <Flex className={cn.headingTitle} alignItems={FlexAlign.CENTER}
            justifyContent={FlexJustify.START} gap={12}>
            <AccessibleButton
              form={ButtonForm.RECT}
              type={ButtonType.SECONDARY}
              iconLeft={collapsed ? navigation.expandIcon : navigation.collapseIcon}
              accessibleLabel={collapsed ? 'Развернуть навигацию' : 'Свернуть навигацию'}
              expanded={!collapsed}
              controls={`${id}-navigation`}
              onClick={() => setCollapsed((previous) => !previous)}
            />
            {breadcrumb ?? <H level={1} isOverflowedTextHidden lineClamp={2}>{title}</H>}
          </Flex>
          {(actions || (trigger && !triggerInToolbar)) && (
            <Flex alignItems={FlexAlign.CENTER} justifyContent={FlexJustify.END}
              flexWrap={FlexWrap.WRAP} gap={8}>
              {actions}
              {!triggerInToolbar && trigger}
            </Flex>
          )}
        </Flex>
        {(toolbar || (trigger && triggerInToolbar)) && (
          <div className={cn.toolbar}>
            {toolbar}
            {triggerInToolbar && trigger}
          </div>
        )}
      </header>

      <main className={cn.content} tabIndex={0} aria-label="Область продукта">
        {children}
      </main>

      {rightPanel && (
        <aside ref={panelRef} id={`${id}-panel`} className={cn.rightPanel}
          aria-labelledby={`${id}-panel-title`} aria-hidden={!panelOpen}
          onKeyDown={onPanelKeyDown}>
          <Surface className={cn.panelSurface} background={SurfaceBackground.FILL1} borderRadius={16}>
            <div className={cn.panelHeader}>
              <div id={`${id}-panel-title`}><H level={3}>{rightPanel.title}</H></div>
              <AccessibleButton
                form={ButtonForm.RECT}
                type={ButtonType.TRANSPARENT}
                iconLeft={rightPanel.closeIcon}
                accessibleLabel="Закрыть правую панель"
                onClick={closePanel}
              />
            </div>
            <div className={cn.panelBody}>{rightPanel.content}</div>
          </Surface>
        </aside>
      )}
    </div>
  );
}
