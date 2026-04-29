import clsx from 'clsx';
import type { ReactNode } from 'react';

export function MediaContainer({ bleed = false, children }: { bleed?: boolean; children: ReactNode }) {
  return (
    <div
      className={clsx(
        'flex justify-center min-h-56 max-h-135 aspect-4/3 overflow-hidden border border-solid border-media-border-weak rounded-2xl',
        bleed && 'max-sm:-mx-6 max-sm:rounded-none',
      )}
    >
      {children}
    </div>
  );
}
