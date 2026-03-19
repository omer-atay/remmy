import type { ReactNode } from 'react';

export function PageDetailsSection({ children }: { children: ReactNode }) {
  return (
    <aside className="flex flex-col w-xs mt-4 bg-neutral-background-weak rounded-lg">
      <div className="flex flex-col">{children}</div>
    </aside>
  );
}
