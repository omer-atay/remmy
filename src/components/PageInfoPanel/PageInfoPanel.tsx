import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Footer } from '../Footer/Footer';

export function PageInfoPanel({
  children,
  isSticky = true,
  className,
}: {
  children: ReactNode;
  isSticky?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'hidden lg:flex lg:flex-col lg:self-start lg:gap-2 w-xs overflow-x-hidden scrollbar-thin scrollbar-neutral-border',
        className,
        isSticky && 'sticky top-0 overflow-y-auto h-[calc(100vh-56px)]',
      )}
    >
      {children}
      <Footer />
    </div>
  );
}
