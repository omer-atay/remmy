import { Link } from 'wouter';
import type { RecentCommunity } from '../../hooks/useRecentCommunities';

export function CommunityItem({ community }: { community: RecentCommunity }) {
  return (
    <li className="flex gap-1 px-4 py-2 relative hover:bg-neutral-background-weak-hover">
      {community.iconSource && <img className="size-6 rounded-4xl" src={community.iconSource} alt="" />}
      {!community.iconSource && (
        <div className="flex justify-center items-center gap-px size-7 mx-1 pl-0.5 text-xl leading-12 font-extrabold bg-secondary text-neutral-background border-neutral-background rounded-full">
          <span className="mb-1">c</span>
          <span className="mb-2">/</span>
        </div>
      )}
      <div className="flex flex-col">
        <Link
          className="after:content-[''] after:absolute after:inset-0 after:z-999 text-sm text-neutral-content"
          href={`/c/${community.absoluteName}`}
        >
          c/{community.name}
        </Link>
        <span className="text-xs text-neutral-content-weak">{community.subscribers} members</span>
      </div>
    </li>
  );
}
