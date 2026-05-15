import clsx from 'clsx';

export function Backdrop({ className, onClick }: { className?: string; onClick: () => void }) {
  return (
    <div aria-hidden onClick={onClick} className={clsx('size-full fixed inset-0 z-1001 bg-black/30', className)} />
  );
}
