import { useQuery } from '@tanstack/react-query';
import { CommunityList } from '../CommunityList/CommunityList';
import { postQueries } from '../../queries';
import { PostsSection } from '../PostsSection/PostsSection';
import { AppLogo } from '../../icons/AppLogo';

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
      <AppLogo height={22} className="text-global-white" />
      <CommunityList />
      <PostsSection posts={posts.posts} />
    </>
  );
}
