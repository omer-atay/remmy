import { Menu } from 'lucide-react';
import { SidebarContent } from './SidebarContent';
import { useState } from 'react';
import clsx from 'clsx';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={clsx(
        'hidden xl:flex flex-col bg-neutral-background h-[calc(100vh-3.5rem-1px)] px-4 sticky top-14 overflow-auto scrollbar-thin scrollbar-neutral-border text-sm border-r border-r-neutral-border transition-[width] duration-300',
        isCollapsed ? 'w-8' : 'w-68',
      )}
    >
      <SidebarContent isSidebarShrink={isCollapsed} />

      <button
        onClick={() => {
          setIsCollapsed((prev) => !prev);
        }}
        className={clsx(
          'p-2 fixed top-20 bg-neutral-background border border-neutral-border hover:border-neutral-border-strong active:bg-neutral-background-selected rounded-full -translate-x-[50%] transition-[left] duration-300',
          isCollapsed ? 'left-8' : 'left-68',
        )}
        type="button"
        title={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
      >
        <Menu size={18} />
      </button>
    </div>
  );
}
