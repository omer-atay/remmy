import { useMutation, usePrefetchInfiniteQuery, useQuery } from '@tanstack/react-query';
import { commentQueries, postQueries } from '../../queries';
import { Link, useLocation } from 'wouter';
import { Upvote } from '../../icons/Upvote';
import { Downvote } from '../../icons/Downvote';
import { Share } from '../../icons/Share';
import { Comment } from '../../icons/Comment';
import { ArrowLeft } from 'lucide-react';
import type { CreatePostLike, PostView } from 'lemmy-js-client';
import { CommentsSection } from '../CommentsSection/CommentsSection';
import { CommunityDetails } from '../CommunityDetails/CommunityDetails';
import { ImageViewer } from '../ImageViewer/ImageViewer';
import { useState } from 'react';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';
import { PostPageBody } from './PostPageBody';
import { Sidebar } from '../Sidebar/Sidebar';
import { Popover } from '../Popover/Popover';
import { PopoverUserDetails } from '../Popover/PopoverUserDetails';
import { PopoverCommunityDetails } from '../Popover/PopoverCommunityDetails';
import { client } from '../../client';
import clsx from 'clsx';
import { CommentToPostSection } from '../CommentsSection/CommentToPostSection';
import { getTime } from '../../utils/getTime';

export function PostPage({ id }: { id: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-20">
      <Sidebar />
      <PostMain id={id} />
    </div>
  );
}

function PostMain({ id }: { id: string }) {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery(
    postQueries.detail({
      id: parseInt(id),
    }),
  );

  usePrefetchInfiniteQuery(
    commentQueries.list({
      post_id: parseInt(id),
      sort: 'Hot',
      type_: 'All',
      limit: 10,
      max_depth: 50,
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !post) {
    return <p>Error, something went wrong</p>;
  }

  return (
    <div className="grid grid-cols-[2fr_1fr] mt-6">
      <PostSection post={post.post_view} />

      <PageInfoPanel className="top-14">
        <CommunityDetails community={post} />
      </PageInfoPanel>
    </div>
  );
}

function PostSection({ post }: { post: PostView }) {
  const [, setLocation] = useLocation();
  const [isCreatorDetailsShown, setIsCreatorDetailsShown] = useState(false);
  const [isCommunityDetailsShown, setIsCommunityDetailsShown] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const voteMutation = useMutation({
    mutationFn: async (variables: CreatePostLike) => {
      return client.likePost(variables);
    },
  });

  const postData = voteMutation.data?.post_view ?? post;

  const upVotePost = () => {
    voteMutation.mutate({
      post_id: postData.post.id,
      score: postData.my_vote === 1 ? 0 : 1,
    });
  };

  const downVotePost = () => {
    voteMutation.mutate({
      post_id: postData.post.id,
      score: postData.my_vote === -1 ? 0 : -1,
    });
  };

  const communityAbsoluteName = postData.community.local
    ? postData.community.name
    : `${postData.community.name}@${new URL(postData.community.actor_id).host}`;

  const creatorAbsoluteName = postData.creator.local
    ? postData.creator.name
    : `${postData.creator.name}@${new URL(postData.creator.actor_id).host}`;

  return (
    <div className="flex flex-col justify-between gap-1 relative">
      <div className="flex flex-col justify-between gap-2 w-2xl px-2 rounded-2xl">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                if (history.length > 1) {
                  history.back();
                }
                setLocation(`/c/${communityAbsoluteName}`);
              }}
              className="p-1.5 absolute -left-8 rounded-full text-secondary-onBackground bg-secondary-background hover:bg-secondary-background-hover"
              type="button"
              title="Go back"
            >
              <ArrowLeft size={20} />
              <span className="sr-only">Go back</span>
            </button>

            {postData.community.icon && <img className="size-8 rounded-4xl" src={postData.community.icon} alt="" />}

            {!postData.community.icon && (
              <div className="flex justify-center items-center gap-px size-7 mx-1 pl-0.5 text-xl leading-12 font-extrabold bg-secondary text-neutral-background border-neutral-background rounded-full">
                <span className="mb-1">c</span>
                <span className="mb-2">/</span>
              </div>
            )}

            <div className="flex flex-col justify-center relative text-xs">
              <div className="flex gap-1">
                <div className="relative">
                  <Link
                    onMouseEnter={() => {
                      setIsCommunityDetailsShown(true);
                    }}
                    onMouseLeave={() => {
                      setIsCommunityDetailsShown(false);
                    }}
                    href={`/c/${communityAbsoluteName}`}
                    className="font-bold text-neutral-content hover:text-primary"
                  >
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
                          banner: postData.community.banner ?? '',
                          icon: postData.community.icon ?? '',
                          name: postData.community.name,
                          absoluteName: communityAbsoluteName,
                          description: postData.community.description ?? '',
                        }}
                      />
                    </Popover>
                  )}
                </div>

                <span className="text-neutral-content-weak" aria-hidden="true">
                  •
                </span>

                <span className="text-neutral-content-weak">{getTime(postData.post.published)}</span>
              </div>

              <div className="relative">
                <Link
                  onMouseEnter={() => {
                    setIsCreatorDetailsShown(true);
                  }}
                  onMouseLeave={() => {
                    setIsCreatorDetailsShown(false);
                  }}
                  className="text-neutral-content hover:text-primary"
                  href={`/u/${creatorAbsoluteName}`}
                >
                  {creatorAbsoluteName}
                </Link>

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
                        icon: postData.creator.avatar ?? '',
                        name: postData.creator.name,
                        absoluteName: creatorAbsoluteName,
                        published: postData.creator.published,
                      }}
                    />
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="pb-1.5 text-2xl font-bold text-neutral-content-strong">{postData.post.name}</p>

          <PostPageBody
            post={post}
            openImage={() => {
              setIsImageOpen(true);
            }}
          />
        </div>

        <div className="flex gap-4 text-xs font-extrabold text-neutral-content-strong">
          <div className="flex justify-center items-center rounded-2xl bg-secondary-background">
            <button
              onClick={() => {
                upVotePost();
              }}
              className={clsx(
                'p-2 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover',
                postData.my_vote === 1 && 'text-action-upvote',
              )}
              type="button"
              title="Upvote"
            >
              <Upvote />
              <span className="sr-only">Upvote</span>
            </button>

            <span>{postData.counts.upvotes}</span>

            <button
              onClick={() => {
                downVotePost();
              }}
              className={clsx(
                'p-2 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover',
                postData.my_vote === -1 && 'text-action-downvote',
              )}
              type="button"
              title="Downvote"
            >
              <Downvote />
              <span className="sr-only">Downvote</span>
            </button>
          </div>

          <button
            className="flex justify-center items-center gap-1 py-2 px-4 rounded-2xl bg-secondary-background hover:bg-secondary-background-hover"
            type="button"
            title="Comment"
          >
            <Comment />
            <span>{postData.counts.comments}</span>
            <span className="sr-only">Comment</span>
          </button>

          <button
            className="flex justify-center items-center gap-1.5 py-2 px-4 rounded-2xl bg-secondary-background hover:bg-secondary-background-hover"
            type="button"
          >
            <Share />
            <span>Share</span>
          </button>
        </div>

        <CommentToPostSection post={post} />
      </div>

      <CommentsSection totalCount={postData.counts.comments} postId={postData.post.id} />

      {isImageOpen && (
        <ImageViewer
          onClose={() => {
            setIsImageOpen(false);
          }}
          src={postData.post.url ?? ''}
        />
      )}
    </div>
  );
}
