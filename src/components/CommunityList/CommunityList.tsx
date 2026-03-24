import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'wouter';
import { communityQueries } from '../../queries';

export function CommunityList() {
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const { data, isLoading, isError } = useQuery(
    communityQueries.list({
      sort: 'TopAll',
      type_: 'Local',
      limit: 20,
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !data) {
    return <p>Error, something went wrong</p>;
  }

  const visibleCommunities = shouldShowMore ? data.communities : data.communities.slice(0, 5);

  return (
    <aside className="flex flex-col max-w-2xs h-fit px-4 py-2 bg-neutral-background-weak rounded-lg">
      <div className="flex flex-col">
        <h2 className="text-xs font-extrabold text-neutral-content-weak">POPULAR COMMUNITIES</h2>
        <ul className="flex flex-col mt-4">
          {visibleCommunities.map((community) => {
            console.log(community.community);

            const communityAbsoluteName = community.community.local
              ? community.community.name
              : `${community.community.name}@${new URL(community.community.actor_id).host}`;

            return (
              <li
                key={community.community.id}
                className="flex gap-1 px-4 py-2 relative hover:bg-neutral-background-weak-hover"
              >
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
          })}
        </ul>
        <button
          className="flex w-fit px-3 py-2 mt-1 text-xs font-extrabold text-neutral-content-strong hover:bg-secondary-background-hover rounded-2xl"
          onClick={() => {
            setShouldShowMore((prev) => !prev);
          }}
        >
          See {!shouldShowMore ? 'more' : 'less'}
        </button>
      </div>
    </aside>
  );
}
