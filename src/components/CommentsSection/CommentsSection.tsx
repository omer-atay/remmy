import { useInfiniteQuery } from '@tanstack/react-query';
import { commentQueries } from '../../queries';
import { Link } from 'wouter';
import { Upvote } from '../../icons/Upvote';
import { Downvote } from '../../icons/Downvote';
import { Comment } from '../../icons/Comment';
import { Share } from '../../icons/Share';
import { ThreeDot } from '../../icons/ThreeDot';
import { Markdown } from '../Markdown/Markdown';
import { useIntersectionObserver } from 'usehooks-ts';

export function CommentsSection({ postId, totalCount }: { postId: number; totalCount: number }) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    commentQueries.list({
      totalCount,
      options: {
        post_id: postId,
        sort: 'Hot',
        type_: 'All',
        limit: 10,
        max_depth: 50,
      },
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

  console.log(data);

  return (
    <div className="flex flex-col gap-16 w-2xl">
      {data.pages.flatMap((page) =>
        page.comments.map((comment, i) => {
          const creatorAbsoluteName = comment.creator.local
            ? comment.creator.name
            : `${comment.creator.name}@${new URL(comment.creator.actor_id).host}`;

          return (
            <div className="flex flex-col gap-2" key={comment.comment.id}>
              {i}, {comment.comment.path}
              <div className="flex items-center gap-2">
                {comment.creator.avatar && <img className="size-8 rounded-full" src={comment.creator.avatar} alt="" />}
                {!comment.creator.avatar && (
                  <div className="flex justify-center items-center size-8 rounded-full bg-brand-background">
                    <span className="text-neutral-content-strong">{comment.creator.name[0]?.toUpperCase()}</span>
                  </div>
                )}

                <Link
                  href={`/u/${creatorAbsoluteName}`}
                  className="text-xs font-bold text-neutral-content-strong z-1000 hover:underline"
                >
                  u/{creatorAbsoluteName}
                </Link>

                {comment.comment.creator_id === comment.post.creator_id && (
                  <span className="text-xs font-bold text-global-alienblue">OP</span>
                )}

                <span className="created-separator text-xs text-neutral-content-weak" aria-hidden="true">
                  •
                </span>

                <span className="text-xs text-neutral-content-weak">{comment.comment.published} ago</span>
              </div>
              <div className="flex flex-col pl-10">
                <div className="text-sm leading-5">
                  <Markdown>{comment.comment.content}</Markdown>
                </div>

                <div className="flex text-secondary-plain-weak">
                  <div className="flex items-center">
                    <button className="p-2 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover">
                      <Upvote />
                    </button>

                    <span className="font-bold text-xs">
                      {comment.counts.upvotes > comment.counts.downvotes
                        ? comment.counts.upvotes
                        : -comment.counts.downvotes}
                    </span>

                    <button className="p-2 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover">
                      <Downvote />
                    </button>
                  </div>

                  <button className="flex items-center gap-1 w-fit py-2 px-4 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong">
                    <Comment />
                    <span className="font-bold text-xs">Reply</span>
                  </button>

                  <button className="flex justify-center items-center gap-1.5 w-fit py-2 px-4 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong">
                    <Share />
                    <span className="font-bold text-xs">Share</span>
                  </button>

                  <button className="py-2 px-3 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong">
                    <ThreeDot />
                  </button>
                </div>
              </div>
            </div>
          );
        }),
      )}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
