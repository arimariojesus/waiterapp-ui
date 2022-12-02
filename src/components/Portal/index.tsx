import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  target?: Element | string;
  className?: string;
}

export const Portal = (props: PortalProps) => {
  const { target, className, children } = props;

  const [mounted, setMounted] = useState(false);
  const ref = useRef<Element | null>(null);

  useLayoutEffect(() => {
    setMounted(true);

    ref.current = !target
      ? document.createElement('div')
      : typeof target === 'string'
      ? document.querySelector(target)
      : target;

    if (!target && !!ref.current) {
      document.body.appendChild<Element>(ref.current);
    }

    return () => {
      !target && !!ref.current && document.body.removeChild(ref.current);
    };
  }, [target]);

  if (!mounted || !ref.current) {
    return null;
  }

  return createPortal(<div className={className}>{children}</div>, ref.current);
};
