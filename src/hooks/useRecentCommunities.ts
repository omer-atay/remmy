import { useLocalStorage } from 'usehooks-ts';

export interface RecentCommunity {
  name: string;
  absoluteName: string;
  iconSource?: string;
  subscribers: number;
}

export function useRecentCommunities() {
  return useLocalStorage<RecentCommunity[]>('recentCommunities', []);
}
