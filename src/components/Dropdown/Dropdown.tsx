import type { ReactNode } from 'react';

export function Dropdown({
  onHover,
  onUnhover,
  children,
}: {
  onHover?: () => void;
  onUnhover?: () => void;
  children: ReactNode;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
      className="max-w-90 w-[90vw] absolute z-2000 pt-2 top-[calc(100%-3px)]"
    >
      <div className="bg-neutral-background p-6 overflow-hidden shadow-[0_0.25rem_0.5rem_0_#00000033,0_0.375rem_0.75rem_0_#00000080] rounded-2xl">
        {children}
      </div>
    </div>
  );
}
