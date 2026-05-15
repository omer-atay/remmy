import { Backdrop } from '../Backdrop/Backdrop';
import { SidebarContent } from './SidebarContent';
import { ScrollLock } from '../ScrollLock/ScrollLock';

export function SidebarMobile({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        className={
          'bg-neutral-background h-[calc(100vh-3.5rem-1px)] w-68 px-4 fixed z-2001 top-14 overflow-auto scrollbar-thin scrollbar-neutral-border text-sm border-r border-r-neutral-border'
        }
      >
        <SidebarContent />
      </div>

      <Backdrop
        onClick={() => {
          onClose();
        }}
        className="self-end max-h-[calc(100vh-3.5rem)]"
      />

      <ScrollLock />
    </>
  );
}
