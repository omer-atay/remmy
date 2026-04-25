import type { CreatePostLike, GetPostsResponse, PostView } from 'lemmy-js-client';
import { Link } from 'wouter';
import { Upvote } from '../../icons/Upvote';
import { Downvote } from '../../icons/Downvote';
import { Comment } from '../../icons/Comment';
import { Share } from '../../icons/Share';
import { ThreeDot } from '../../icons/ThreeDot';
import { PostCardBody } from './PostCardBody';
import { Divider } from '../Divider/Divider';
import { Popover } from '../Popover/Popover';
import { PopoverUserDetails } from '../Popover/PopoverUserDetails';
import { useState } from 'react';
import { PopoverCommunityDetails } from '../Popover/PopoverCommunityDetails';
import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { client } from '../../client';
import { postQueries, userQueries } from '../../queries';
import clsx from 'clsx';

export function PostCard({ post, source = 'community' }: { post: PostView; source?: 'community' | 'creator' }) {
  const [isCommunityDetailsShown, setIsCommunityDetailsShown] = useState(false);
  const [isCreatorDetailsShown, setIsCreatorDetailsShown] = useState(false);
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: async (variables: CreatePostLike) => {
      await client.likePost(variables);
    },
    onMutate: (variables, context) => {
      // Optimistically update to the new value
      context.client.setQueriesData(
        { queryKey: postQueries.lists() },
        (old: InfiniteData<GetPostsResponse> | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page) => {
                return {
                  ...page,
                  posts: page.posts.map((post) => {
                    if (post.post.id !== variables.post_id) {
                      return post;
                    }

                    return {
                      ...post,
                      my_vote: variables.score,
                    };
                  }),
                };
              }),
            };
          }
        },
      );
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: postQueries.lists() });
    },
  });

  const upVotePost = () => {
    voteMutation.mutate(
      {
        post_id: post.post.id,
        score: post.my_vote === 1 ? 0 : 1,
      },
      {
        onSettled: () => {
          void queryClient.invalidateQueries({
            queryKey: userQueries.details(),
          });
        },
      },
    );
  };

  const downVotePost = () => {
    voteMutation.mutate(
      {
        post_id: post.post.id,
        score: post.my_vote === -1 ? 0 : -1,
      },
      {
        onSettled: () => {
          void queryClient.invalidateQueries({
            queryKey: userQueries.details(),
          });
        },
      },
    );
  };

  const creatorAbsoluteName = post.creator.local
    ? post.creator.name
    : `${post.creator.name}@${new URL(post.creator.actor_id).host}`;

  const communityAbsoluteName = post.community.local
    ? post.community.name
    : `${post.community.name}@${new URL(post.community.actor_id).host}`;

  return (
    <div className="flex flex-col justify-between gap-1 relative">
      <Divider />
      <div className="flex flex-col justify-between gap-2 w-2xl px-2 rounded-2xl hover:bg-neutral-background-hover">
        {source === 'community' && (
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-1 relative">
              <Link
                onMouseEnter={() => {
                  setIsCommunityDetailsShown(true);
                }}
                onMouseLeave={() => {
                  setIsCommunityDetailsShown(false);
                }}
                href={`/c/${communityAbsoluteName}`}
                className="flex items-center gap-1 text-xs font-bold text-neutral-content z-10 hover:text-primary"
              >
                {post.community.icon && <img className="size-6 rounded-4xl" src={post.community.icon} alt="" />}
                {!post.community.icon && (
                  <div className="flex justify-center items-center gap-px size-7 mx-1 pl-0.5 text-xl leading-12 font-extrabold bg-secondary text-neutral-background border-neutral-background rounded-full">
                    <span className="mb-1">c</span>
                    <span className="mb-2">/</span>
                  </div>
                )}
                c/{communityAbsoluteName}
              </Link>

              {isCommunityDetailsShown && (
                <Popover
                  onHover={() => {
                    setIsCommunityDetailsShown(true);
                  }}
                  onUnhover={() => {
                    setIsCommunityDetailsShown(false);
                  }}
                >
                  <PopoverCommunityDetails
                    data={{
                      banner: post.community.banner ?? '',
                      icon: post.community.icon ?? '',
                      name: post.community.name,
                      absoluteName: communityAbsoluteName,
                      description: post.community.description ?? '',
                    }}
                  />
                </Popover>
              )}

              <span className="created-separator text-xs text-neutral-content-weak" aria-hidden="true">
                •
              </span>

              <span className="text-xs text-neutral-content-weak">{post.community.published} ago</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                className="flex justify-center items-center py-1 px-3 z-10 text-xs text-global-white font-bold bg-primary-background rounded-2xl hover:bg-primary-background-hover"
                type="button"
              >
                Join
              </button>

              <button className="p-2 z-10 hover:bg-secondary-background-hover rounded-full" type="button" title="More">
                <ThreeDot />
                <span className="sr-only">More</span>
              </button>
            </div>
          </div>
        )}

        {source === 'creator' && (
          <div className="flex justify-between items-center gap-2 relative">
            <div className="flex items-center gap-1">
              {!post.creator.deleted && (
                <div className="flex items-center gap-1">
                  <Link
                    onMouseEnter={() => {
                      setIsCreatorDetailsShown(true);
                    }}
                    onMouseLeave={() => {
                      setIsCreatorDetailsShown(false);
                    }}
                    className="flex items-center gap-1 z-10 text-xs font-bold text-neutral-content hover:text-primary"
                    href={`/u/${creatorAbsoluteName}`}
                  >
                    {post.creator.avatar && <img className="size-6 rounded-4xl" src={post.creator.avatar} alt="" />}
                    {!post.creator.avatar && (
                      <div className="flex justify-center items-center size-6 rounded-full bg-brand-background">
                        <span className="text-neutral-content-strong">{post.creator.name[0]?.toUpperCase()}</span>
                      </div>
                    )}
                    u/{creatorAbsoluteName}
                  </Link>
                </div>
              )}

              {post.creator.deleted && (
                <div>
                  <div className="flex justify-center size-6 rounded-4xl bg-brand-background">
                    <span className="mb-2 text-xl leading-12 font-extrabold">X</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-content">[deleted]</span>
                </div>
              )}

              <span className="created-separator text-xs text-neutral-content-weak" aria-hidden="true">
                •
              </span>

              <span className="text-xs text-neutral-content-weak">{post.creator.published} ago</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 z-10 hover:bg-secondary-background-hover rounded-full" type="button" title="More">
                <ThreeDot />
                <span className="sr-only">More</span>
              </button>
            </div>

            {isCreatorDetailsShown && (
              <Popover
                onHover={() => {
                  setIsCreatorDetailsShown(true);
                }}
                onUnhover={() => {
                  setIsCreatorDetailsShown(false);
                }}
              >
                <PopoverUserDetails
                  data={{
                    icon: post.creator.avatar ?? '',
                    name: post.creator.name,
                    absoluteName: creatorAbsoluteName,
                    published: post.post.published,
                  }}
                />
              </Popover>
            )}
          </div>
        )}

        <PostCardBody post={post} />

        <div className="flex gap-4 text-xs font-extrabold text-neutral-content-strong">
          <div className="flex justify-center items-center rounded-2xl bg-secondary-background">
            <button
              onClick={() => {
                upVotePost();
              }}
              className={clsx(
                'p-2 z-10 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover',
                post.my_vote === 1 && 'text-action-upvote',
              )}
              type="button"
              title="Upvote"
            >
              <Upvote />
              <span className="sr-only">Upvote</span>
            </button>

            <span>{post.counts.upvotes}</span>

            <button
              onClick={() => {
                downVotePost();
              }}
              className={clsx(
                'p-2 z-10 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover',
                post.my_vote === -1 && 'text-action-downvote',
              )}
              type="button"
              title="Downvote"
            >
              <Downvote />
              <span className="sr-only">Downvote</span>
            </button>
          </div>

          <button
            className="flex justify-center items-center gap-1 py-2 px-4 z-10 rounded-2xl bg-secondary-background hover:bg-secondary-background-hover"
            type="button"
            title="Comment"
          >
            <Comment />
            <span>{post.counts.comments}</span>
            <span className="sr-only">Comment</span>
          </button>

          <button
            className="flex justify-center items-center gap-1.5 py-2 px-4 z-10 rounded-2xl bg-secondary-background hover:bg-secondary-background-hover"
            type="button"
          >
            <Share />
            <span>Share</span>
          </button>
        </div>

        <Link className="after:content-[''] after:absolute after:inset-0" href={`/post/${post.post.id}`} />
      </div>
    </div>
  );
}
