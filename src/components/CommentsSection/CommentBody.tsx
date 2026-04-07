import type { CommentView } from 'lemmy-js-client';
import { Markdown } from '../Markdown/Markdown';
import { Upvote } from '../../icons/Upvote';
import { Downvote } from '../../icons/Downvote';
import { Comment as CommentIcon } from '../../icons/Comment';
import { Share } from '../../icons/Share';
import { ThreeDot } from '../../icons/ThreeDot';

export function CommentBody({ data }: { data: CommentView }) {
  const areButtonsDisabled = data.comment.deleted || data.comment.removed;

  return (
    <div className="flex flex-col pl-10">
      <div className="text-sm leading-5">
        {data.comment.deleted && <span className="text-neutral-content-weak">Comment deleted by user</span>}

        {data.comment.removed && <span className="text-neutral-content-weak">Comment removed by moderator</span>}

        <Markdown>{data.comment.content}</Markdown>
      </div>

      <div className="flex text-secondary-plain-weak">
        <div className="flex items-center">
          <button
            disabled={areButtonsDisabled}
            className={
              !areButtonsDisabled
                ? 'p-2 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover'
                : 'text-interactive-content-disabled p-2'
            }
          >
            <Upvote />
          </button>

          {!areButtonsDisabled && (
            <span className="font-bold text-xs">
              {data.counts.upvotes > data.counts.downvotes ? data.counts.upvotes : -data.counts.downvotes}
            </span>
          )}

          <button
            disabled={areButtonsDisabled}
            className={
              !areButtonsDisabled
                ? 'p-2 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover'
                : 'text-interactive-content-disabled p-2'
            }
          >
            <Downvote />
          </button>
        </div>

        <button
          disabled={areButtonsDisabled}
          className={
            !areButtonsDisabled
              ? 'flex items-center gap-1 w-fit py-2 px-4 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong'
              : 'text-interactive-content-disabled flex items-center gap-1 w-fit py-2 px-4'
          }
        >
          <CommentIcon />
          <span className="font-bold text-xs">Reply</span>
        </button>

        <button
          disabled={areButtonsDisabled}
          className={
            !areButtonsDisabled
              ? 'flex justify-center items-center gap-1.5 w-fit py-2 px-4 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong'
              : 'text-interactive-content-disabled flex justify-center items-center gap-1.5 w-fit py-2 px-4'
          }
        >
          <Share />
          <span className="font-bold text-xs">Share</span>
        </button>

        {!areButtonsDisabled && (
          <button className="py-2 px-3 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong">
            <ThreeDot />
          </button>
        )}
      </div>
    </div>
  );
}
