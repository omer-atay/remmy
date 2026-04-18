import { BookOpenText, ChevronDown, House, UsersRound } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { clsx } from 'clsx';
import { Divider } from '../Divider/Divider';
import { RecentSidebarLists } from '../RecentSidebarLists/RecentSidebarLists';
import { useLocalStorage } from 'usehooks-ts';

function SidebarListSection({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col w-full py-4 px-1">{children}</ul>;
}

function SidebarListItem({ children }: { children: ReactNode }) {
  return <li className="flex gap-1">{children}</li>;
}

export function Sidebar() {
  const [location] = useLocation();
  const [clickedCommunityNames] = useLocalStorage<string[]>('clickedCommunityNames', []);
  const [selectedList, setSelectedList] = useState(location);
  const [showRecent, setShowRecent] = useState(clickedCommunityNames.length !== 0);

  return (
    <div className="flex flex-col h-screen w-68 px-4 fixed top-14 overflow-auto text-sm border-r border-r-neutral-border">
      <SidebarListSection>
        <SidebarListItem>
          <Link
            onClick={() => {
              setSelectedList('/');
            }}
            className={clsx(
              'flex items-center gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover',
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
              'flex gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover',
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

      <div className="flex flex-col">
        <button
          onClick={() => {
            if (clickedCommunityNames.length === 0) {
              return;
            }

            setShowRecent((prev) => !prev);
          }}
          type="button"
          className="flex justify-between items-center w-full p-2.5 pl-3 text-secondary-weak text-[12px] tracking-widest rounded-lg hover:bg-neutral-background-hover"
        >
          <span>RECENT</span>

          <ChevronDown size={20} />
        </button>

        {showRecent && (
          <SidebarListSection>
            <RecentSidebarLists />
          </SidebarListSection>
        )}

        <Divider />
      </div>

      <SidebarListSection>
        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/"
          >
            <BookOpenText size={20} />
            <span>Legal & Help Center</span>
          </a>
        </SidebarListItem>

        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/tos/"
          >
            <BookOpenText size={20} />
            <span>Terms of Service</span>
          </a>
        </SidebarListItem>

        <SidebarListItem>
          <a
            className="flex items-center gap-3 w-full p-2.5 pl-3 rounded-lg text-secondary hover:bg-neutral-background-hover"
            href="https://legal.lemmy.world/privacy-policy/"
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
