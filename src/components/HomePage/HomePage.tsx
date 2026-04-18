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
    <div className="grid grid-cols-[3fr_1fr] relative">
      <Sidebar />

      <div className="flex flex-col items-center ml-68">
        <PostFilterSection />
        <PostsSection posts={allPosts} />
        {hasNextPage && <div ref={ref}>Loading...</div>}
      </div>

      <PageInfoPanel>
        <CommunityListSection />
      </PageInfoPanel>
    </div>
  );
}
