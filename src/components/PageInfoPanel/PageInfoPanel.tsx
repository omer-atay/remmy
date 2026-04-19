import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Footer } from '../Footer/Footer';

export function PageInfoPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-2 w-xs sticky top-0 self-start h-[calc(100vh-56px)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-neutral-border',
        className,
      )}
    >
      {children}
      <Footer />
    </div>
  );
}
