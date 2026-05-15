import { SidebarContent } from './SidebarContent';

export function Sidebar() {
  return (
    <div
      className={
        'hidden xl:flex flex-col bg-neutral-background h-[calc(100vh-3.5rem-1px)] w-68 px-4 sticky top-14 overflow-auto scrollbar-thin scrollbar-neutral-border text-sm border-r border-r-neutral-border'
      }
    >
      <SidebarContent />
    </div>
  );
}
