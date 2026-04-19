import { CommunityItem } from '../CommunityItem/CommunityItem';
import { useRecentCommunities } from '../../hooks/useRecentCommunities';

export function RecentSidebarList() {
  const [recentCommunities] = useRecentCommunities();

  return (
    <>
      {recentCommunities.map((community) => {
        return <CommunityItem key={community.name} community={community} />;
      })}
    </>
  );
}
