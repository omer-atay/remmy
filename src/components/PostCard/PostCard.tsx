import type { PostView } from 'lemmy-js-client';
import { Link } from 'wouter';
import { Upvote } from '../../icons/Upvote';
import { Downvote } from '../../icons/Downvote';
import { Comment } from '../../icons/Comment';
import { Share } from '../../icons/Share';
import { ThreeDot } from '../../icons/ThreeDot';
import { PostCardBody } from './PostCardBody';
import { Divider } from '../Divider/Divider';

export function PostCard({ post, source = 'community' }: { post: PostView; source?: 'community' | 'creator' }) {
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
            <div className="flex items-center gap-1">
              <Link
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

            {/* <div>
                  {post.community.banner && (
                    <img src={post.community.banner} alt="banner_img" />
                  )}
                  <div className="flex justify-between gap-2">
                    <img
                      className="size-10 rounded-4xl"
                      src={post.community.icon}
                      alt={post.community.name}
                    />

                    <h3>r/{post.community.name}</h3>
                  </div>
                  <p>{post.community.description}</p>
                </div> */}

            {/* // will need for styling etc.
                 <p>ID {post.community.id}</p>
                <p>NSFW {post.community.nsfw}</p>
                <p>REMOVED {post.community.removed}</p> */}
          </div>
        )}

        {source === 'creator' && (
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-1">
              {!post.creator.deleted && (
                <div className="flex items-center gap-1">
                  <Link
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

            {/* <div>
                  {post.creator.banner && <img src={post.creator.banner} alt="" />}
                  <div className="flex items-center gap-2">
                    <img className="size-8 rounded-4xl" src={post.creator.avatar} alt="" />
                    <Link className="text-1xl font-semibold" href={`/u/${creatorAbsoluteName`}>
                      u/{post.creator.name}
                    </Link>
                  </div>
                </div> */}

            {/* // will need for styling etc.
              <p>ACTOR ID {post.creator.actor_id}</p>
              <p>ID {post.creator.id}</p>
              <p>ID {post.creator.published}</p> */}
          </div>
        )}

        <PostCardBody post={post} />

        <div className="flex gap-4 text-xs font-extrabold text-neutral-content-strong">
          <div className="flex justify-center items-center rounded-2xl bg-secondary-background">
            <button
              className="p-2 z-10 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover"
              type="button"
              title="Upvote"
            >
              <Upvote />
              <span className="sr-only">Upvote</span>
            </button>
            <span>{post.counts.upvotes}</span>
            <button
              className="p-2 z-10 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover"
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
