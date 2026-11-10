import { useCallback } from 'react';
import type { MutableRefObject } from 'react';

import { Button } from '@frontend/ui-kit';
import type { ButtonProps } from '@frontend/ui-kit';

type AccessibleButtonProps = ButtonProps & {
  accessibleLabel?: string;
  controls?: string;
  expanded?: boolean;
  current?: boolean;
  buttonRef?: MutableRefObject<HTMLButtonElement | null>;
};

export function AccessibleButton({
  accessibleLabel,
  controls,
  expanded,
  current,
  buttonRef,
  ...props
}: AccessibleButtonProps) {
  const connectButton = useCallback((button: HTMLButtonElement | null) => {
    if (buttonRef) buttonRef.current = button;
    if (!button) return;

    // The kit Button forwards its DOM ref but has no public ARIA props.
    const attributes = {
      'aria-label': accessibleLabel,
      'aria-controls': controls,
      'aria-expanded': expanded === undefined ? undefined : String(expanded),
      'aria-current': current ? 'page' : undefined,
      title: accessibleLabel,
    };

    Object.entries(attributes).forEach(([name, value]) => {
      if (value === undefined) button.removeAttribute(name);
      else button.setAttribute(name, value);
    });
  }, [accessibleLabel, buttonRef, controls, current, expanded]);

  return <Button {...props} ref={connectButton} />;
}
