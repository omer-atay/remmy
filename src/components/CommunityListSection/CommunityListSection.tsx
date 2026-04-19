import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { communityQueries } from '../../queries';
import { PageDetailsSection } from '../PageDetailsSection/PageDetailsSection';
import { CommunityItem } from '../CommunityItem/CommunityItem';

export function CommunityListSection() {
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
    <PageDetailsSection>
      <div className="p-4">
        <h2 className="text-xs font-bold text-neutral-content-weak">POPULAR COMMUNITIES</h2>
        <ul className="flex flex-col mt-4">
          {visibleCommunities.map((community) => {
            const communityAbsoluteName = community.community.local
              ? community.community.name
              : `${community.community.name}@${new URL(community.community.actor_id).host}`;
            return (
              <CommunityItem
                key={community.community.id}
                community={{
                  absoluteName: communityAbsoluteName,
                  name: community.community.name,
                  iconSource: community.community.icon,
                  subscribers: community.counts.subscribers,
                }}
              />
            );
          })}
        </ul>
        <button
          onClick={() => {
            setShouldShowMore((prev) => !prev);
          }}
          className="flex w-fit px-3 py-2 mt-1 text-xs font-extrabold text-neutral-content-strong hover:bg-secondary-background-hover rounded-2xl"
          type="button"
        >
          See {!shouldShowMore ? 'more' : 'less'}
        </button>
      </div>
    </PageDetailsSection>
  );
}
