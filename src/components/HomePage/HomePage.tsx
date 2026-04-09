import { useInfiniteQuery } from '@tanstack/react-query';
import { CommunityList } from '../CommunityList/CommunityList';
import { postQueries } from '../../queries';
import { PostsSection } from '../PostsSection/PostsSection';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';
import { useIntersectionObserver } from 'usehooks-ts';
import { PostFilterSection } from '../PostFilterSection/PostFilterSection';
import { usePostFilterParams } from '../../usePostFilterParams';

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
    <div className="grid grid-cols-[1fr_2fr_1fr]">
      <div>sidebar</div>

      <div className="flex flex-col items-center">
        <PostFilterSection />
        <PostsSection posts={allPosts} />
        {hasNextPage && <div ref={ref}>Loading...</div>}
      </div>

      <PageInfoPanel>
        <CommunityList />
      </PageInfoPanel>
    </div>
  );
}
