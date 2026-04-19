import type { ReactNode } from 'react';

export function PageDetailsSection({ children }: { children: ReactNode }) {
  return (
    <aside>
      <div className="flex flex-col w-xs bg-neutral-background-weak rounded-lg overflow-hidden">{children}</div>
    </aside>
  );
}
