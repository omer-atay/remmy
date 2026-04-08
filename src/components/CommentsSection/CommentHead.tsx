import type { CommentView } from 'lemmy-js-client';
import { Link } from 'wouter';

export function CommentHead({ data, variant = 'normal' }: { data: CommentView; variant?: 'compact' | 'normal' }) {
  const creatorAbsoluteName = data.creator.local
    ? data.creator.name
    : `${data.creator.name}@${new URL(data.creator.actor_id).host}`;

  return (
    <div className="flex items-center gap-2">
      {variant === 'normal' && (
        <>
          {data.creator.avatar && <img className="size-8 rounded-full" src={data.creator.avatar} alt="" />}
          {!data.creator.avatar && (
            <div className="flex justify-center items-center size-8 rounded-full bg-neutral-content-weak">
              {!data.creator.deleted && (
                <span className="text-neutral-content-strong font-semibold">{data.creator.name[0]?.toUpperCase()}</span>
              )}
              {data.creator.deleted && <span className="text-5xl leading-12 text-neutral-background">X</span>}
            </div>
          )}
        </>
      )}

      {!data.creator.deleted && (
        <Link
          href={`/u/${creatorAbsoluteName}`}
          className="text-xs font-bold text-neutral-content-strong hover:underline"
        >
          u/{creatorAbsoluteName}
        </Link>
      )}

      {data.creator.deleted && <span className="text-xs font-bold text-neutral-content-weak">[deleted]</span>}

      {data.comment.creator_id === data.post.creator_id && (
        <span className="text-xs font-bold text-global-alienblue">OP</span>
      )}

      <span className="created-separator text-xs text-neutral-content-weak" aria-hidden="true">
        •
      </span>

      <span className="text-xs text-neutral-content-weak">{data.comment.published} ago</span>
    </div>
  );
}
