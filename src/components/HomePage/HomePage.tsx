import { useQuery } from '@tanstack/react-query';
import { client } from '../../client';
import { PostCard } from '../PostCard/PostCard';
import { CommunityList } from '../CommunityList/CommunityList';

export function HomePage() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts', 'topday'],
    queryFn: () => {
      return client.getPosts({
        sort: 'TopDay',
        type_: 'Local',
      });
    },
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !posts) {
    return <p>Error, something went wrong</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-extrabold">remmy</h1>
      <CommunityList />
      <div className="flex flex-col items-center gap-2 mx-auto max-w-2xl">
        {posts.posts.map((post) => {
          return <PostCard key={post.post.id} post={post} />;
        })}
      </div>
    </>
  );
}
