import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { communityQueries } from '../../queries';
import { PageDetailsSection } from '../PageDetailsSection/PageDetailsSection';
import { CommunityList } from '../CommunityList/CommunityList';

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
            console.log(community.community);
            return <CommunityList key={community.community.id} community={community} />;
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
    </PageDetailsSection>
  );
}
