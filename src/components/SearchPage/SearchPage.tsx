import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'wouter';
import { searchQueries } from '../../queries';
import { Sidebar } from '../Sidebar/Sidebar';
import { PostsSection } from './PostsSection';
import { CommunitiesSection } from './CommunitiesSection';
import { UsersSection } from './UsersSection';
import { ViewOptionButton } from './ViewOptionButton';

export function SearchPage() {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <SearchMain />
    </div>
  );
}

function SearchMain() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('q') ?? '';

  const view = searchParams.get('view') ?? 'posts';

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

  return (
    <div className="flex flex-col max-w-6xl mx-auto my-6">
      <div className="flex gap-2 mb-6">
        <ViewOptionButton
          name="Posts"
          selectedOption={view}
          onClick={() => {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              next.set('view', 'posts');
              return next;
            });
          }}
        />

        <ViewOptionButton
          name="Communities"
          selectedOption={view}
          onClick={() => {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              next.set('view', 'communities');
              return next;
            });
          }}
        />

        <ViewOptionButton
          name="Users"
          selectedOption={view}
          onClick={() => {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              next.set('view', 'users');
              return next;
            });
          }}
        />
      </div>

      {view === 'posts' && <PostsSection posts={data.posts} />}

      {view === 'communities' && <CommunitiesSection communities={data.communities} />}

      {view === 'users' && <UsersSection users={data.users} />}
    </div>
  );
}
