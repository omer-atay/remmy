import type { ReactNode } from 'react';

export function PostCardTitle({ children }: { children: ReactNode }) {
  return <p className="pb-1.5 text-[16px] md:text-xl font-bold text-neutral-content-strong">{children}</p>;
}
