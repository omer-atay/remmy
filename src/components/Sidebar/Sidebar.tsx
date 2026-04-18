import { BookOpenText, House, UsersRound } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { clsx } from 'clsx';
import { Divider } from '../Divider/Divider';

function SidebarListSection({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col w-full py-4 px-1">{children}</ul>;
}

function SidebarListItem({ children }: { children: ReactNode }) {
  return <li className="flex gap-1">{children}</li>;
}

export function Sidebar() {
  const [location] = useLocation();
  const [selectedList, setSelectedList] = useState(location);

  return (
    <div className="flex flex-col items-center h-screen w-68 px-4 fixed top-14 text-sm border-r border-r-neutral-border">
      <SidebarListSection>
        <SidebarListItem>
          <Link
            onClick={() => {
              setSelectedList('/');
            }}
            className={clsx(
              'flex items-center gap-3 w-full p-3 pl-4 rounded-xl text-secondary hover:bg-neutral-background-hover',
              selectedList === '/' ? 'bg-neutral-background-selected text-secondary-onBackground' : undefined,
            )}
            href="/"
          >
            <House fill={selectedList === '/' ? 'currentColor' : 'none'} size={20} />
            <span>Home</span>
          </Link>
        </SidebarListItem>

        <SidebarListItem>
          <Link
            onClick={() => {
              setSelectedList('/communities');
            }}
            className={clsx(
              'flex gap-3 w-full p-3 pl-4 rounded-xl text-secondary hover:bg-neutral-background-hover',
              selectedList === '/communities'
                ? 'bg-neutral-background-selected text-secondary-onBackground'
                : undefined,
            )}
            href="/communities"
          >
            <UsersRound fill={selectedList === '/communities' ? 'currentColor' : 'none'} size={20} />
            <span>Communities</span>
          </Link>
        </SidebarListItem>
        <Divider />
      </SidebarListSection>

      <SidebarListSection>
        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-3 pl-4 rounded-xl text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/"
          >
            <BookOpenText size={20} />
            <span>Legal & Help Center</span>
          </a>
        </SidebarListItem>

        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-3 pl-4 rounded-xl text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/tos/"
          >
            <BookOpenText size={20} />
            <span>Terms of Service</span>
          </a>
        </SidebarListItem>

        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-3 pl-4 rounded-xl text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/privacy-policy/"
          >
            <BookOpenText size={20} />
            <span>Privacy Policy</span>
          </a>
        </SidebarListItem>
      </SidebarListSection>

      <span className="text-tone-2 text-[10px]">Remmy, 2026</span>
    </div>
  );
}
