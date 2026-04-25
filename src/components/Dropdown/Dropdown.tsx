import type { ReactNode } from 'react';

export function Dropdown({ children }: { children: ReactNode }) {
  return (
    <div className="w-[256px] absolute z-2000 pt-2 top-[calc(100%-3px)] right-0">
      <div className="bg-neutral-background-strong p-6 overflow-y-auto shadow-[0_0.25rem_0.5rem_0_#00000033,0_0.375rem_0.75rem_0_#00000080] rounded-lg">
        {children}
      </div>
    </div>
  );
}
