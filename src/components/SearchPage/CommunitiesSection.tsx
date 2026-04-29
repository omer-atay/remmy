import type { CommunityView } from 'lemmy-js-client';
import { Fragment } from 'react/jsx-runtime';
import { Link } from 'wouter';
import { Divider } from '../Divider/Divider';

export function CommunitiesSection({ communities }: { communities: CommunityView[] }) {
  return (
    <div className="flex flex-col px-2 sm:px-8">
      {communities.map((community) => {
        const communityAbsoluteName = community.community.local
          ? community.community.name
          : `${community.community.name}@${new URL(community.community.actor_id).host}`;

        return (
          <Fragment key={community.community.id}>
            <li className="flex gap-1 p-4 relative hover:bg-neutral-background-hover rounded-2xl">
              {community.community.icon && (
                <img className="size-12 rounded-4xl" src={community.community.icon} alt="" />
              )}
              {!community.community.icon && (
                <div className="flex justify-center items-center shrink-0 gap-px size-12 mr-1 text-4xl leading-12 font-extrabold bg-secondary text-neutral-background border-neutral-background rounded-full">
                  <span className="mb-1">c</span>
                  <span className="mb-2">/</span>
                </div>
              )}

              <div className="flex flex-col">
                <Link
                  className="after:content-[''] after:absolute after:inset-0 after:z-999 mb-2 text-[18px] leading-6 text-neutral-content-strong font-semibold"
                  href={`/c/${communityAbsoluteName}`}
                >
                  c/{community.community.name}
                </Link>

                <p className="text-ellipsis overflow-hidden text-sm leading-5 line-clamp-3 text-neutral-content">
                  {community.community.description}
                </p>

                <div className="flex flex-wrap mt-1 text-xs text-neutral-content-weak">
                  <span>{community.counts.subscribers} members</span>
                  <span className="mx-1">·</span>
                  <span>{community.counts.users_active_week} weekly active users</span>
                </div>
              </div>
            </li>
            <Divider />
          </Fragment>
        );
      })}
    </div>
  );
}
