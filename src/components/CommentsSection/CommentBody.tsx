import type { CommentView, CreateCommentLike } from 'lemmy-js-client';
import { Markdown } from '../Markdown/Markdown';
import { Upvote } from '../../icons/Upvote';
import { Downvote } from '../../icons/Downvote';
import { Comment as CommentIcon } from '../../icons/Comment';
import { Share } from '../../icons/Share';
import { useMutation } from '@tanstack/react-query';
import { client } from '../../client';
import clsx from 'clsx';
import { useComment } from '../../contexts/useCommentContext';

export function CommentBody({ data }: { data: CommentView }) {
  const { isMakingComment, setIsMakingComment } = useComment();

  const voteMutation = useMutation({
    mutationFn: async (variables: CreateCommentLike) => {
      return client.likeComment(variables);
    },
  });

  const comment = voteMutation.data?.comment_view ?? data;

  const areButtonsDisabled = comment.comment.deleted || comment.comment.removed;

  const upVoteComment = () => {
    voteMutation.mutate({
      comment_id: comment.comment.id,
      score: comment.my_vote === 1 ? 0 : 1,
    });
  };

  const downVoteComment = () => {
    voteMutation.mutate({
      comment_id: comment.comment.id,
      score: comment.my_vote === -1 ? 0 : -1,
    });
  };

  return (
    <div className="flex flex-col pl-10">
      <div className="text-sm leading-5 wrap-anywhere">
        {comment.comment.deleted && <span className="text-neutral-content-weak">Comment deleted by user</span>}

        {comment.comment.removed && <span className="text-neutral-content-weak">Comment removed by moderator</span>}

        <Markdown>{comment.comment.content}</Markdown>
      </div>

      <div className="flex text-secondary-plain-weak">
        <div className="flex items-center">
          <button
            onClick={() => {
              upVoteComment();
            }}
            className={clsx(
              comment.my_vote === 1 && 'text-action-upvote',
              !areButtonsDisabled
                ? 'p-2 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover'
                : 'text-interactive-content-disabled p-2',
            )}
            type="button"
            title="Upvote"
            disabled={areButtonsDisabled}
          >
            <Upvote />
            <span className="sr-only">Upvote</span>
          </button>

          {!areButtonsDisabled && (
            <span className="font-bold text-xs">
              {comment.counts.upvotes > comment.counts.downvotes ? comment.counts.upvotes : -comment.counts.downvotes}
            </span>
          )}

          <button
            onClick={() => {
              downVoteComment();
            }}
            className={clsx(
              comment.my_vote === -1 && 'text-action-downvote',
              !areButtonsDisabled
                ? 'p-2 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover'
                : 'text-interactive-content-disabled p-2',
            )}
            type="button"
            title="Downvote"
            disabled={areButtonsDisabled}
          >
            <Downvote />
            <span className="sr-only">Downvote</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (!isMakingComment) {
              setIsMakingComment(true);
              return;
            }
            setIsMakingComment(false);
          }}
          className={
            !areButtonsDisabled
              ? 'flex items-center gap-1 w-fit py-2 px-4 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong'
              : 'text-interactive-content-disabled flex items-center gap-1 w-fit py-2 px-4'
          }
          type="button"
          disabled={areButtonsDisabled}
        >
          <CommentIcon />
          <span className="font-bold text-xs">Reply</span>
        </button>

        <button
          className={
            !areButtonsDisabled
              ? 'flex justify-center items-center gap-1.5 w-fit py-2 px-4 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong'
              : 'text-interactive-content-disabled flex justify-center items-center gap-1.5 w-fit py-2 px-4'
          }
          type="button"
          disabled={areButtonsDisabled}
        >
          <Share />
          <span className="font-bold text-xs">Share</span>
        </button>
      </div>
    </div>
  );
}
