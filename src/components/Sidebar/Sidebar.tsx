import { BookOpenText, ChevronDown, House, UsersRound } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { clsx } from 'clsx';
import { Divider } from '../Divider/Divider';
import { RecentSidebarList } from '../RecentSidebarList/RecentSidebarList';
import { useRecentCommunities } from '../../hooks/useRecentCommunities';
import { useLocalStorage } from 'usehooks-ts';

function SidebarListSection({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col w-full py-4 px-1">{children}</ul>;
}

function SidebarListItem({ children }: { children: ReactNode }) {
  return <li className="flex gap-1">{children}</li>;
}

export function Sidebar() {
  const [location] = useLocation();
  const [recentCommunities] = useRecentCommunities();
  const [showRecent, setShowRecent] = useLocalStorage('recent', true);

  return (
    <div className="hidden xl:flex xl:flex-col h-[calc(100vh-3.5rem-1px)] w-68 px-4 sticky top-14 overflow-auto scrollbar-thin scrollbar-neutral-border text-sm border-r border-r-neutral-border">
      <SidebarListSection>
        <SidebarListItem>
          <Link
            className={clsx(
              'flex items-center gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover',
              location === '/' ? 'bg-neutral-background-selected text-secondary-onBackground' : undefined,
            )}
            href="/"
          >
            <House fill={location === '/' ? 'currentColor' : 'none'} size={20} />
            <span>Home</span>
          </Link>
        </SidebarListItem>

        <SidebarListItem>
          <Link
            className={clsx(
              'flex gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover',
              location === '/communities' ? 'bg-neutral-background-selected text-secondary-onBackground' : undefined,
            )}
            href="/communities"
          >
            <UsersRound fill={location === '/communities' ? 'currentColor' : 'none'} size={20} />
            <span>Communities</span>
          </Link>
        </SidebarListItem>
        <Divider />
      </SidebarListSection>

      {recentCommunities.length > 0 && (
        <div className="flex flex-col">
          <button
            onClick={() => {
              setShowRecent((prev) => !prev);
            }}
            type="button"
            title="Minimize recent comunities"
            className="flex justify-between items-center w-full p-2.5 pl-3 text-secondary-weak text-[12px] tracking-widest rounded-lg hover:bg-neutral-background-hover"
          >
            <span>RECENT</span>
            <span className="sr-only">Minimize recent communities</span>

            <ChevronDown size={20} />
          </button>

          {showRecent && (
            <SidebarListSection>
              <RecentSidebarList />
            </SidebarListSection>
          )}

          <Divider />
        </div>
      )}

      <SidebarListSection>
        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/"
            target="_blank"
          >
            <BookOpenText size={20} />
            <span>Legal & Help Center</span>
          </a>
        </SidebarListItem>

        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/tos/"
            target="_blank"
          >
            <BookOpenText size={20} />
            <span>Terms of Service</span>
          </a>
        </SidebarListItem>

        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/privacy-policy/"
            target="_blank"
          >
            <BookOpenText size={20} />
            <span>Privacy Policy</span>
          </a>
        </SidebarListItem>
      </SidebarListSection>

      <span className="text-tone-2 text-[10px] text-center">Remmy, 2026</span>
    </div>
  );
}
