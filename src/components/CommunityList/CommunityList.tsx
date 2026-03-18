import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { client } from '../../client';
import { Link } from 'wouter';

export function CommunityList() {
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);

  const {
    data: communities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['communities', 'topall'],
    queryFn: () => {
      return client.listCommunities({
        sort: 'TopAll',
        type_: 'Local',
        limit: 20,
      });
    },
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !communities) {
    return <p>Error, something went wrong</p>;
  }

  return (
    <aside className="flex flex-col max-w-2xs px-4 py-2 bg-neutral-background-weak rounded-lg">
      <h2 className="text-xs font-extrabold pb-4 text-neutral-content-weak">POPULAR COMMUNITIES</h2>
      {communities.communities.map((community, i) => {
        if (i >= 5 && !isSeeMoreClicked) {
          return;
        }

        return (
          <div key={community.community.id} className="flex gap-1 px-4 py-2 hover:bg-neutral-background-weak-hover">
            <img className="size-9 rounded-4xl" src={community.community.icon} alt="" />
            <div className="flex flex-col">
              <Link className="text-sm text-neutral-content" href={`/c/${community.community.name}`}>
                c/{community.community.name}
              </Link>
              <span className="text-xs text-neutral-content-weak">{community.counts.subscribers} members</span>
            </div>
          </div>
        );
      })}
      <button
        className="flex w-fit px-3 py-2 mt-1 text-xs font-extrabold text-neutral-content-strong hover:bg-secondary-background-hover rounded-2xl"
        onClick={() => {
          setIsSeeMoreClicked((prev) => !prev);
        }}
      >
        See {!isSeeMoreClicked ? 'more' : 'less'}
      </button>
    </aside>
  );
}
