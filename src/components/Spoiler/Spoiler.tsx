import type { ReactNode } from 'react';

export function Spoiler({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="my-4">
      <summary className="cursor-pointer font-bold">{title}</summary>
      <div>{children}</div>
    </details>
  );
}
