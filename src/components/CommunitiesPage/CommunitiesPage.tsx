import { useQuery } from '@tanstack/react-query';
import { communityQueries } from '../../queries';
import { CommunityList } from '../CommunityList/CommunityList';
import { Sidebar } from '../Sidebar/Sidebar';

export function CommunitiesPage() {
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
    <>
      <Sidebar />
      <ul className="grid grid-cols-3 gap-x-6 gap-y-4 max-w-280 ml-80 p-6">
        {data.communities.map((community) => {
          return <CommunityList key={community.community.id} community={community} />;
        })}
      </ul>
    </>
  );
}
