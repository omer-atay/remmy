import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'wouter';
import { searchQueries } from '../../queries';
import { Sidebar } from '../Sidebar/Sidebar';
import { PostsSection } from './PostsSection';
import { CommunitiesSection } from './CommunitiesSection';
import { UsersSection } from './UsersSection';
import { ViewOptionButton } from './ViewOptionButton';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';
import { CommunityListSection } from '../CommunityListSection/CommunityListSection';

type View = 'posts' | 'communities' | 'users';

export function SearchPage() {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <SearchMain />
    </div>
  );
}

function SearchResults() {
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get('q') ?? '';
  const view = (searchParams.get('view') ?? 'posts') as View;

  const { data, isLoading, isError } = useQuery(
    searchQueries.result({
      q: searchValue,
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !data) {
    return <p>Error, something went wrong</p>;
  }

  switch (view) {
    case 'posts':
      return <PostsSection posts={data.posts} />;
    case 'communities':
      return <CommunitiesSection communities={data.communities} />;
    case 'users':
      return <UsersSection users={data.users} />;
  }
}

function SearchMain() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = (searchParams.get('view') ?? 'posts') as View;

  const setView = (newView: View) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('view', newView);
      return next;
    });
  };

  return (
    <div className="flex flex-col max-w-6xl w-full mx-auto my-6">
      <div className="flex gap-2 mb-6">
        <ViewOptionButton
          isSelected={view === 'posts'}
          onClick={() => {
            setView('posts');
          }}
        >
          Posts
        </ViewOptionButton>

        <ViewOptionButton
          isSelected={view === 'communities'}
          onClick={() => {
            setView('communities');
          }}
        >
          Communities
        </ViewOptionButton>

        <ViewOptionButton
          isSelected={view === 'users'}
          onClick={() => {
            setView('users');
          }}
        >
          Users
        </ViewOptionButton>
      </div>

      {view === 'posts' ? (
        <div className="flex gap-8">
          <SearchResults />

          <PageInfoPanel className="top-14 h-[calc(100vh-86px)] ml-auto">
            <CommunityListSection />
          </PageInfoPanel>
        </div>
      ) : (
        <SearchResults />
      )}
    </div>
  );
}
