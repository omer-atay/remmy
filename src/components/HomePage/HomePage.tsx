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
    <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr]">
      <Sidebar />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] max-w-5xl w-full min-w-0 mx-auto lg:px-4">
        <div className="mt-6 min-w-0 mx-auto w-full max-w-155">
          <PostFilterSection />
          <HomePosts />
        </div>

        <PageInfoPanel className="top-22 pt-4">
          <CommunityListSection />
        </PageInfoPanel>
      </div>
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
