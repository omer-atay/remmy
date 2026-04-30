import { CommunityItem } from '../CommunityItem/CommunityItem';
import { useRecentCommunities } from '../../hooks/useRecentCommunities';

export function RecentSidebarList() {
  const [recentCommunities] = useRecentCommunities();

  return (
    <>
      {recentCommunities.map((community, i) => {
        // eslint-disable-next-line @eslint-react/no-array-index-key
        return <CommunityItem key={i} community={community} />;
      })}
    </>
  );
}
