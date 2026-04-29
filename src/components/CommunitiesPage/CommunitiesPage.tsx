import { useQuery } from '@tanstack/react-query';
import { communityQueries } from '../../queries';
import { CommunityItem } from '../CommunityItem/CommunityItem';
import { Sidebar } from '../Sidebar/Sidebar';

export function CommunitiesPage() {
  return (
    <div className="grid grid-cols-1 mx-auto xl:grid-cols-[auto_1fr]">
      <Sidebar />
      <CommunitiesMain />
    </div>
  );
}

function CommunitiesMain() {
  const { data, isLoading, isError } = useQuery(
    communityQueries.list({
      sort: 'TopAll',
      type_: 'All',
      limit: 50,
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !data) {
    return <p>Error, something went wrong</p>;
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 sm:gap-x-26 lg:gap-x-36 gap-y-4 max-w-280 py-6 mx-auto">
      {data.communities.map((community) => {
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
  );
}
