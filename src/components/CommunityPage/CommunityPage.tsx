import {
  useInfiniteQuery,
  useMutation,
  usePrefetchInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { communityQueries, postQueries, siteQuery } from '../../queries';
import { PostsSection } from '../PostsSection/PostsSection';
import { CommunityDetails } from '../CommunityDetails/CommunityDetails';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';
import { useIntersectionObserver } from 'usehooks-ts';
import { PostFilterSection } from '../PostFilterSection/PostFilterSection';
import { usePostFilterParams } from '../../usePostFilterParams';
import type { FollowCommunity, PostSortType } from 'lemmy-js-client';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect } from 'react';
import { useRecentCommunities } from '../../hooks/useRecentCommunities';
import clsx from 'clsx';
import { client } from '../../client';
import { useSignup } from '../../contexts/useSignupContext';

const MAX_RECENT_COMMUNITIES = 10;

export function CommunityPage({ name }: { name: string }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr]">
      <Sidebar />
      <CommunityMain name={name} />
    </div>
  );
}

function CommunityMain({ name }: { name: string }) {
  const { sort } = usePostFilterParams();
  const [, setRecentCommunities] = useRecentCommunities();
  const queryClient = useQueryClient();
  const { setIsSignupShown } = useSignup();

  const { data: site, isLoading: isSiteLoading, isError: isSiteError } = useQuery(siteQuery);

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
      type_: 'All',
      community_name: name,
    }),
  );

  const joinMutation = useMutation({
    mutationFn: async (variables: FollowCommunity) => {
      return client.followCommunity(variables);
    },
  });

  useEffect(() => {
    if (!community) {
      return;
    }

    const absoluteName = community.community_view.community.local
      ? community.community_view.community.name
      : `${community.community_view.community.name}@${new URL(community.community_view.community.actor_id).host}`;

    setRecentCommunities((prev) => {
      const filtered = prev.filter((recentCommunity) => recentCommunity.absoluteName !== absoluteName);

      if (filtered.length >= MAX_RECENT_COMMUNITIES) {
        filtered.pop();
      }

      return [
        {
          absoluteName,
          name: community.community_view.community.name,
          iconSource: community.community_view.community.icon,
          subscribers: community.community_view.counts.subscribers,
        },
        ...filtered,
      ];
    });
  }, [community, setRecentCommunities]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !community) {
    return <p>Error, something went wrong</p>;
  }

  const communityData = community.community_view;

  const joinCommunity = () => {
    joinMutation.mutate(
      {
        community_id: community.community_view.community.id,
        follow: community.community_view.subscribed === 'Subscribed' ? false : true,
      },
      {
        onSettled: () => {
          void queryClient.invalidateQueries(
            communityQueries.detail({
              name,
            }),
          );
        },
      },
    );
  };

  return (
    <div className="sm:px-4 md:px-12 mt-2 max-w-300 w-full min-w-0 mx-auto">
      <div className="w-full h-16 sm:h-32">
        {communityData.community.banner ? (
          <img
            className="h-full w-full object-cover object-center sm:rounded-md"
            src={communityData.community.banner}
            alt=""
          />
        ) : (
          <div className="w-full h-16 bg-secondary-background sm:rounded-md" />
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 relative py-3 pl-4">
          <div className="flex sm:justify-center items-center gap-4 sm:pl-28">
            {communityData.community.icon && (
              <img
                className="size-12 sm:size-24 border-4 sm:absolute right-0 left-4 bottom-2 bg-neutral-background border-neutral-background rounded-full"
                src={communityData.community.icon}
                alt=""
              />
            )}

            {!communityData.community.icon && (
              <div className="flex justify-center items-center gap-0.5 size-11 sm:size-18 outline-8 sm:absolute left-4 bottom-2 text-3xl sm:text-5xl leading-12 font-extrabold bg-neutral-content text-neutral-background border-neutral-background rounded-full">
                <span className="mb-3">c</span>
                <span className="mb-5">/</span>
              </div>
            )}

            <h2 className="text-[18px] sm:text-3xl font-bold text-neutral-content-strong">
              c/{communityData.community.name}
            </h2>
          </div>

          <div className="flex sm:justify-center items-center gap-3">
            <button
              className="flex justify-center items-center gap-2 text-secondary-plain text-sm font-bold border border-neutral-border-medium rounded-3xl py-1.5 px-2 hover:text-secondary-plain-hover hover:border-secondary-plain-hover"
              type="button"
            >
              <Plus size={24} strokeWidth={1.75} />
              <span>Create Post</span>
            </button>

            <button
              onClick={() => {
                if (isSiteLoading || isSiteError || !site) {
                  return;
                }

                if (!site.my_user) {
                  setIsSignupShown(true);
                  return;
                }

                joinCommunity();
              }}
              className={clsx(
                'py-2 px-3.5 text-sm text-global-white font-bold rounded-3xl border border-neutral-border-medium bg-neutral-background hover:bg-neutral-background-hover hover:border-secondary-plain-hover active:bg-neutral-background-selected',
                communityData.subscribed !== 'Subscribed' && 'bg-primary-background hover:bg-primary-background-hover',
              )}
              type="button"
            >
              {(() => {
                switch (communityData.subscribed) {
                  case 'Subscribed':
                    return 'Joined';
                  case 'ApprovalRequired':
                    return 'Waiting approval';
                  case 'Pending':
                    return 'Pending';
                  case 'NotSubscribed':
                    return 'Join';
                }
              })()}
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'grid grid-cols-1 lg:grid-cols-[1fr_auto] mt-32',
          communityData.community.banner ? 'sm:mt-16' : 'sm:mt-0',
        )}
      >
        <div className="flex flex-col md:max-w-167.5 w-full min-w-0 mx-auto">
          <PostFilterSection />
          <CommunityPosts communityName={name} sort={sort} />
        </div>

        <PageInfoPanel className="top-14">
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
