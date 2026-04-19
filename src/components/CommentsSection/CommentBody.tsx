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
      <div className="text-sm leading-5 wrap-anywhere">
        {data.comment.deleted && <span className="text-neutral-content-weak">Comment deleted by user</span>}

        {data.comment.removed && <span className="text-neutral-content-weak">Comment removed by moderator</span>}

        <Markdown>{data.comment.content}</Markdown>
      </div>

      <div className="flex text-secondary-plain-weak">
        <div className="flex items-center">
          <button
            className={
              !areButtonsDisabled
                ? 'p-2 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover'
                : 'text-interactive-content-disabled p-2'
            }
            type="button"
            title="Upvote"
            disabled={areButtonsDisabled}
          >
            <Upvote />
            <span className="sr-only">Upvote</span>
          </button>

          {!areButtonsDisabled && (
            <span className="font-bold text-xs">
              {data.counts.upvotes > data.counts.downvotes ? data.counts.upvotes : -data.counts.downvotes}
            </span>
          )}

          <button
            className={
              !areButtonsDisabled
                ? 'p-2 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover'
                : 'text-interactive-content-disabled p-2'
            }
            type="button"
            title="Downvote"
            disabled={areButtonsDisabled}
          >
            <Downvote />
            <span className="sr-only">Downvote</span>
          </button>
        </div>

        <button
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

        {!areButtonsDisabled && (
          <button
            className="py-2 px-3 rounded-2xl hover:bg-secondary-background-hover hover:text-neutral-content-strong"
            type="button"
            title="More"
          >
            <ThreeDot />
            <span className="sr-only">More</span>
          </button>
        )}
      </div>
    </div>
  );
}
