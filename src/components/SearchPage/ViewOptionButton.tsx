import clsx from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export function ViewOptionButton({ children, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex justify-center items-center px-3 py-2 text-sm text-neutral-content-strong font-bold rounded-full',
        isSelected && 'bg-secondary-background-selected',
      )}
      type="button"
    >
      {children}
    </button>
  );
}
