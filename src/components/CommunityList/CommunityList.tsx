import type { CommunityView } from 'lemmy-js-client';
import { Link } from 'wouter';

export function CommunityList({ community }: { community: CommunityView }) {
  const communityAbsoluteName = community.community.local
    ? community.community.name
    : `${community.community.name}@${new URL(community.community.actor_id).host}`;

  return (
    <li className="flex gap-1 px-4 py-2 relative hover:bg-neutral-background-weak-hover">
      <img className="size-9 rounded-4xl" src={community.community.icon} alt="" />
      <div className="flex flex-col">
        <Link
          className="after:content-[''] after:absolute after:inset-0 after:z-999 text-sm text-neutral-content"
          href={`/c/${communityAbsoluteName}`}
        >
          c/{communityAbsoluteName}
        </Link>
        <span className="text-xs text-neutral-content-weak">{community.counts.subscribers} members</span>
      </div>
    </li>
  );
}
