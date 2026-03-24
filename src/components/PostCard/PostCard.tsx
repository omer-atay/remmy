import type { PostView } from 'lemmy-js-client';
import { Link } from 'wouter';
import { Upvote } from '../../icons/Upvote';
import { Downvote } from '../../icons/Downvote';
import { Comment } from '../../icons/Comment';
import { Share } from '../../icons/Share';
import { ThreeDot } from '../../icons/ThreeDot';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactPlayer from 'react-player';

export function PostCard({ post, source = 'community' }: { post: PostView; source?: 'community' | 'creator' }) {
  const creatorAbsoluteName = post.creator.local
    ? post.creator.name
    : `${post.creator.name}@${new URL(post.creator.actor_id).host}`;

  const communityAbsoluteName = post.community.local
    ? post.community.name
    : `${post.community.name}@${new URL(post.community.actor_id).host}`;

  return (
    <div className="flex flex-col justify-between gap-1 relative">
      <hr className="border-0 border-b border-solid border-b-media-border-weak" />
      <div className="flex flex-col justify-between gap-2 w-2xl px-2 rounded-2xl hover:bg-neutral-background-hover">
        {source === 'community' && (
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-1">
              <img className="size-6 rounded-4xl" src={post.community.icon} alt="" />

              <Link
                href={`/c/${communityAbsoluteName}`}
                className="text-xs font-bold text-neutral-content z-1000 hover:text-primary"
              >
                c/{communityAbsoluteName}
              </Link>

              <span className="created-separator text-xs text-neutral-content-weak" aria-hidden="true">
                •
              </span>

              <span className="text-xs text-neutral-content-weak">{post.community.published} ago</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="flex justify-center items-center py-1 px-3 z-1000 text-xs text-global-white font-bold bg-primary-background rounded-2xl hover:bg-primary-background-hover">
                Join
              </button>

              <button className="p-2 z-1000 hover:bg-secondary-background-hover rounded-full">
                <ThreeDot />
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
                <div className="flex items-center gap-2">
                  <img className="size-6 rounded-4xl" src={post.creator.avatar} alt="" />

                  <Link
                    className="z-1000 text-xs font-bold text-neutral-content hover:text-primary"
                    href={`/u/${creatorAbsoluteName}`}
                  >
                    u/{creatorAbsoluteName}
                  </Link>
                </div>
              )}

              {post.creator.deleted && (
                <div>
                  <div className="size-6 rounded-4xl" />
                  <span className="text-xs font-bold text-neutral-content">[deleted]</span>
                </div>
              )}

              <span className="created-separator text-xs text-neutral-content-weak" aria-hidden="true">
                •
              </span>

              <span className="text-xs text-neutral-content-weak">{post.creator.published} ago</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 z-1000 hover:bg-secondary-background-hover rounded-full">
                <ThreeDot />
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

        <div>
          <p className="pb-1.5 text-xl font-bold text-neutral-content-strong">{post.post.name}</p>

          {post.post.url_content_type && (
            <div className="flex justify-center min-h-56 max-h-135 aspect-4/3 relative z-1000 overflow-hidden border border-solid border-media-border-weak bg-black rounded-2xl">
              {post.post.url_content_type.includes('image') && (
                <>
                  <img src={post.post.thumbnail_url} alt="" />
                  <img className="w-full h-full z-[-1] absolute blur-xl" src={post.post.thumbnail_url} alt="" />
                </>
              )}

              {!post.post.url_content_type.includes('image') && (
                <ReactPlayer src={post.post.url} width={'100%'} height={'100%'} controls />
              )}

              {!post.post.url_content_type && (
                <div>
                  <Markdown remarkPlugins={[remarkGfm]}>{post.post.body}</Markdown>
                </div>
              )}
            </div>
          )}

          {/* // will need for styling etc.
          <p>{post.post.deleted}</p>
          <p>{post.post.nsfw}</p>
          <p>{post.post.removed}</p> */}
        </div>

        <div className="flex gap-4 text-xs font-extrabold text-neutral-content-strong">
          <div className="flex justify-center items-center rounded-2xl bg-secondary-background">
            <button className="p-2 z-1000 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover">
              <Upvote />
            </button>
            <span>{post.counts.upvotes}</span>
            <button className="p-2 z-1000 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover">
              <Downvote />
            </button>
          </div>

          <button className="flex justify-center items-center gap-1 py-2 px-4 z-1000 rounded-2xl bg-secondary-background hover:bg-secondary-background-hover">
            <Comment />
            <span>{post.counts.comments}</span>
          </button>

          <button className="flex justify-center items-center gap-1.5 py-2 px-4 z-1000 rounded-2xl bg-secondary-background hover:bg-secondary-background-hover">
            <Share />
            <span>Share</span>
          </button>
        </div>
        <Link className="after:content-[''] after:absolute after:inset-0 after:z-999" href={`/post/${post.post.id}`} />
      </div>
    </div>
  );
}
