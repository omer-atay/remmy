import { useQuery } from '@tanstack/react-query';
import { CommunityList } from '../CommunityList/CommunityList';
import { postQueries } from '../../queries';
import { PostsSection } from '../PostsSection/PostsSection';

export function HomePage() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery(
    postQueries.list({
      sort: 'TopDay',
      type_: 'Local',
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !posts) {
    return <p>Error, something went wrong</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold text-neutral-content-strong logo">remmy</h1>
      <CommunityList />
      <PostsSection posts={posts.posts} />
    </>
  );
}
