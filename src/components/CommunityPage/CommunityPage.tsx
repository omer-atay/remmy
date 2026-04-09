import { useInfiniteQuery, usePrefetchInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { communityQueries, postQueries } from '../../queries';
import { PostsSection } from '../PostsSection/PostsSection';
import { CommunityDetails } from '../CommunityDetails/CommunityDetails';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';
import { useIntersectionObserver } from 'usehooks-ts';
import { PostFilterSection } from '../PostFilterSection/PostFilterSection';
import { usePostFilterParams } from '../../usePostFilterParams';
import type { PostSortType } from 'lemmy-js-client';

export function CommunityPage({ name }: { name: string }) {
  const { sort } = usePostFilterParams();

  const {
    data: community,
    isLoading,
    isError,
  } = useQuery(
    communityQueries.detail({
      name,
    }),
  );

  usePrefetchInfiniteQuery(
    postQueries.list({
      sort,
      type_: 'Local',
      community_name: name,
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !community) {
    return <p>Error, something went wrong</p>;
  }

  console.log(community.community_view.community.description);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="w-full h-32">
        {community.community_view.community.banner ? (
          <img
            className="h-full w-full object-cover object-center rounded-md"
            src={community.community_view.community.banner}
            alt=""
          />
        ) : (
          <div className="w-full h-16 bg-secondary-background rounded-md" />
        )}

        <div className="flex justify-between relative py-3">
          <div className="flex justify-center items-center gap-4 pl-28">
            {community.community_view.community.icon && (
              <img
                className="size-24 border-4 absolute left-4 bottom-2 bg-neutral-background border-neutral-background rounded-full"
                src={community.community_view.community.icon}
                alt=""
              />
            )}

            {!community.community_view.community.icon && (
              <div className="flex justify-center items-center gap-0.5 size-18 outline-8 absolute left-4 bottom-2 text-5xl leading-12 font-extrabold bg-neutral-content text-neutral-background border-neutral-background rounded-full">
                <span className="mb-3">c</span>
                <span className="mb-5">/</span>
              </div>
            )}

            <h2 className="text-3xl font-bold text-neutral-content-strong">
              c/{community.community_view.community.name}
            </h2>
          </div>

          <div className="flex justify-center items-center gap-3">
            <button className="flex justify-center items-center gap-2 text-secondary-plain text-sm font-bold border border-neutral-border-medium rounded-3xl py-1.5 px-2 hover:text-secondary-plain-hover hover:border-secondary-plain-hover">
              <Plus size={24} strokeWidth={1.75} />
              <span>Create Post</span>
            </button>

            <button className="py-2 px-3.5 text-sm text-global-white font-bold bg-primary-background rounded-3xl hover:bg-primary-background-hover">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[3fr_1fr] mt-16">
        <div>
          <PostFilterSection />
          <CommunityPosts communityName={name} sort={sort} />
        </div>

        <PageInfoPanel>
          <CommunityDetails community={community} />
        </PageInfoPanel>
      </div>
    </div>
  );
}

function CommunityPosts({ communityName, sort }: { communityName: string; sort: PostSortType }) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...postQueries.list({
      sort,
      type_: 'All',
      community_name: communityName,
    }),
    refetchOnMount: false,
  });

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
    <div>
      <PostsSection posts={allPosts} source="creator" />
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
