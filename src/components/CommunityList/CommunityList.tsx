import type { CommunityView } from 'lemmy-js-client';
import { Link } from 'wouter';

export function CommunityList({ community }: { community: CommunityView }) {
  const communityAbsoluteName = community.community.local
    ? community.community.name
    : `${community.community.name}@${new URL(community.community.actor_id).host}`;

  return (
    <li className="flex gap-1 px-4 py-2 relative hover:bg-neutral-background-weak-hover">
      {community.community.icon && <img className="size-6 rounded-4xl" src={community.community.icon} alt="" />}
      {!community.community.icon && (
        <div className="flex justify-center items-center gap-px size-7 mx-1 pl-0.5 text-xl leading-12 font-extrabold bg-secondary text-neutral-background border-neutral-background rounded-full">
          <span className="mb-1">c</span>
          <span className="mb-2">/</span>
        </div>
      )}
      <div className="flex flex-col">
        <Link
          className="after:content-[''] after:absolute after:inset-0 after:z-999 text-sm text-neutral-content"
          href={`/c/${communityAbsoluteName}`}
        >
          c/{community.community.name}
        </Link>
        <span className="text-xs text-neutral-content-weak">{community.counts.subscribers} members</span>
      </div>
    </li>
  );
}
