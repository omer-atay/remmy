import { useInfiniteQuery } from '@tanstack/react-query';
import { postQueries } from '../../queries';
import { PostsSection } from '../PostsSection/PostsSection';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';
import { useIntersectionObserver } from 'usehooks-ts';
import { PostFilterSection } from '../PostFilterSection/PostFilterSection';
import { usePostFilterParams } from '../../usePostFilterParams';
import { Sidebar } from '../Sidebar/Sidebar';
import { CommunityListSection } from '../CommunityListSection/CommunityListSection';

export function HomePage() {
  return (
    <div className="grid grid-cols-[auto_3fr_1fr]">
      <Sidebar />

      <div className="flex flex-col items-center mt-6">
        <PostFilterSection />
        <HomePosts />
      </div>

      <PageInfoPanel className="top-14 right-16 pt-4">
        <CommunityListSection />
      </PageInfoPanel>
    </div>
  );
}

function HomePosts() {
  const { sort } = usePostFilterParams();

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    postQueries.list({
      sort,
      type_: 'All',
    }),
  );

  const { ref } = useIntersectionObserver({
    onChange(isIntersecting) {
      if (isIntersecting) {
        void fetchNextPage();
      }
    },
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !data) {
    return <p>Error, something went wrong</p>;
  }

  const allPosts = data.pages.flatMap((page) => page.posts);

  return (
    <>
      <PostsSection posts={allPosts} />
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </>
  );
}
