export function Backdrop({ onClick }: { onClick: () => void }) {
  return <div aria-hidden onClick={onClick} className="size-full fixed inset-0 z-1001 bg-black/30" />;
}
