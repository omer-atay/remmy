import type { ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import styles from './PageInfoPanel.module.css';
import clsx from 'clsx';

export function PageInfoPanel({ children }: { children: ReactNode }) {
  return (
    <div
      className={clsx(
        styles.scrollbar,
        'flex flex-col gap-2 w-xs py-5 sticky top-0 self-start h-screen overflow-y-auto overflow-x-hidden',
      )}
    >
      {children}
      <Footer />
    </div>
  );
}
