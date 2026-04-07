import type { ReactNode } from 'react';

export function MediaContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center min-h-56 max-h-135 aspect-4/3 overflow-hidden border border-solid border-media-border-weak rounded-2xl">
      {children}
    </div>
  );
}
