import type { ReactNode } from 'react';

export function PageDetailsSection({ children }: { children: ReactNode }) {
  return (
    <aside>
      <div className="flex flex-col w-xs mt-4 bg-neutral-background-weak rounded-lg overflow-hidden sticky top-4">
        {children}
      </div>
    </aside>
  );
}
