import { useQueries } from '@tanstack/react-query';
import { useLocalStorage } from 'usehooks-ts';
import { communityQueries } from '../../queries';
import { CommunityList } from '../CommunityList/CommunityList';

export function RecentSidebarLists() {
  const [clickedCommunityNames] = useLocalStorage<string[]>('clickedCommunityNames', []);

  const communityResults = useQueries({
    queries: clickedCommunityNames.map((name) => ({
      ...communityQueries.detail({ name }),
    })),
  });

  const communities = communityResults.map((result, i) => ({
    name: clickedCommunityNames[i],
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
  }));

  return (
    <>
      {communities.map((community) => {
        if (community.isLoading) return <p key={community.name}>loading...</p>;

        if (community.isError || !community.data) return <p key={community.name}>Error, something went wrong</p>;

        return <CommunityList key={community.name} community={community.data.community_view} />;
      })}
    </>
  );
}
