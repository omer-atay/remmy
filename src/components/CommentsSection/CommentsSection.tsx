import { useInfiniteQuery } from '@tanstack/react-query';
import { commentQueries } from '../../queries';
import { useIntersectionObserver } from 'usehooks-ts';
import type { CommentView } from 'lemmy-js-client';
import { useState } from 'react';
import { clsx } from 'clsx';
import { CommentHead } from './CommentHead';
import { CommentBody } from './CommentBody';
import { AddCircleIcon } from '../../icons/AddCircleIcon';
import { SubtractCircleIcon } from '../../icons/SubtractCircleIcon';

function Comment({ data, comments, level = 0 }: { data: CommentView; comments: CommentView[]; level?: number }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleComment = () => {
    setIsCollapsed((prev) => !prev);
  };

  const childComments = comments.filter((comment) => comment.comment.path.startsWith(data.comment.path));
  const rootChildComments = childComments.filter((comment) => comment.comment.path.split('.').length === level + 3);

  return (
    <div className={clsx('flex flex-col gap-1 relative pl-8', isCollapsed && 'flex-row gap-2')}>
      {childComments.length > 1 && !isCollapsed && (
        <div className="flex flex-col items-center py-5 absolute w-[1.5px] left-12 top-8 bottom-12.5 bg-tone-4 hover:bg-tone-2">
          <button
            type="button"
            className="after:content-[''] after:absolute after:top-0 after:bottom-0 after:-left-1 after:-right-1 after:z-10 bg-neutral-background"
            onClick={toggleComment}
          >
            <SubtractCircleIcon />
          </button>
        </div>
      )}

      {level !== 0 && (
        <button
          type="button"
          className="absolute top-1 left-4 w-4 h-2.5 
              border-l-[1.5px] border-b-[1.5px] text-tone-4 hover:text-tone-2
              rounded-bl-[80px]"
          onClick={toggleComment}
        />
      )}

      {isCollapsed && (
        <button type="button" onClick={toggleComment}>
          <AddCircleIcon />
        </button>
      )}

      <div className="flex flex-col gap-2" key={data.comment.id}>
        <CommentHead data={data} variant={isCollapsed ? 'compact' : 'normal'} />

        {!isCollapsed && <CommentBody data={data} />}
      </div>

      {!isCollapsed &&
        rootChildComments.map((childComment) => (
          <Comment comments={childComments} data={childComment} key={childComment.comment.id} level={level + 1} />
        ))}
    </div>
  );
}

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

  return (
    <div className="flex flex-col gap-16 my-12 max-w-2xl">
      {data.pages.flatMap((page) => {
        const rootComments = page.comments.filter((comment) => comment.comment.path.split('.').length === 2);

        return rootComments.map((comment) => {
          return <Comment comments={page.comments} data={comment} key={comment.comment.id} />;
        });
      })}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
