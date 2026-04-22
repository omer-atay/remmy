import type { ReactNode } from 'react';

export function Dropdown({
  onHover,
  onUnhover,
  children,
}: {
  onHover: () => void;
  onUnhover: () => void;
  children: ReactNode;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
      className="max-w-90 w-[90vw] absolute z-2000 overflow-hidden top-7 bg-neutral-background p-6 rounded-2xl shadow-[0_0.25rem_0.5rem_0_#00000033,0_0.375rem_0.75rem_0_#00000080]"
    >
      {children}
    </div>
  );
}
