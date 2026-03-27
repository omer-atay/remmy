import type { ReactNode } from 'react';
import { Footer } from '../Footer/Footer';

export function PageInfoPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-xs py-5 sticky top-0 self-start h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-neutral-border">
      {children}
      <Footer />
    </div>
  );
}
