import { useQuery } from '@tanstack/react-query';
import { postQueries } from '../../queries';
import { Link } from 'wouter';
import { ThreeDot } from '../../icons/ThreeDot';
import { Upvote } from '../../icons/Upvote';
import { Downvote } from '../../icons/Downvote';
import { Share } from '../../icons/Share';
import { Comment } from '../../icons/Comment';
import { ArrowLeft } from 'lucide-react';
import type { PostView } from 'lemmy-js-client';
import { CommentsSection } from '../CommentsSection/CommentsSection';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CommunityDetails } from '../CommunityDetails/CommunityDetails';
import ReactPlayer from 'react-player';
import { ImageViewer } from '../ImageViewer/ImageViewer';
import { useState } from 'react';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';

export function PostPage({ id }: { id: string }) {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery(
    postQueries.detail({
      id: parseInt(id),
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !post) {
    return <p>Error, something went wrong</p>;
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4">
      <div>SIDEBAR</div>

      <PostSection post={post.post_view} />
      {/* {post.cross_posts.map((cross_post) => {
        return <PostSection key={cross_post.post.id} post={cross_post} />;
      })} */}

      <PageInfoPanel>
        <CommunityDetails community={post} />
      </PageInfoPanel>
    </div>
  );
}

function PostSection({ post }: { post: PostView }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const communityAbsoluteName = post.community.local
    ? post.community.name
    : `${post.community.name}@${new URL(post.community.actor_id).host}`;

  const creatorAbsoluteName = post.creator.local
    ? post.creator.name
    : `${post.creator.name}@${new URL(post.creator.actor_id).host}`;

  return (
    <div className="flex flex-col justify-between gap-1 relative">
      <hr className="border-0 border-b border-solid border-b-media-border-weak" />
      <div className="flex flex-col justify-between gap-2 w-2xl px-2 rounded-2xl">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                history.back();
              }}
              className="p-1.5 rounded-full text-secondary-onBackground bg-secondary-background hover:bg-secondary-background-hover"
            >
              <ArrowLeft size={20} />
            </button>

            <img className="size-8 rounded-4xl" src={post.community.icon} alt="" />

            <div className="flex flex-col justify-center text-xs">
              <div className="flex gap-1">
                <Link
                  href={`/c/${communityAbsoluteName}`}
                  className="font-bold text-neutral-content hover:text-primary"
                >
                  c/{communityAbsoluteName}
                </Link>

                <span className="text-neutral-content-weak" aria-hidden="true">
                  •
                </span>

                <span className="text-neutral-content-weak">{post.community.published} ago</span>
              </div>

              <Link className="text-neutral-content hover:text-primary" href={`/u/${creatorAbsoluteName}`}>
                {creatorAbsoluteName}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-secondary-background-hover rounded-full">
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

        <div>
          <p className="pb-1.5 text-2xl font-bold text-neutral-content-strong">{post.post.name}</p>

          {post.post.url_content_type && (
            <div className="flex justify-center min-h-56 max-h-135 aspect-4/3 overflow-hidden border border-solid border-media-border-weak bg-black rounded-2xl">
              {post.post.url_content_type.includes('image') && (
                <>
                  <div
                    onClick={() => {
                      setIsImageOpen(true);
                    }}
                    aria-hidden
                    className="flex justify-center w-full h-full aspect-4/3 relative z-10 cursor-pointer"
                  >
                    <img src={post.post.url} alt="" />
                    <img className="w-full h-full -z-10 absolute blur-xl" src={post.post.url} alt="" />
                  </div>
                </>
              )}

              {!post.post.url_content_type.includes('image') && (
                <ReactPlayer src={post.post.url} width={'100%'} height={'100%'} controls />
              )}
            </div>
          )}

          <div className="py-2 text-sm leading-5">
            <Markdown remarkPlugins={[remarkGfm]}>{post.post.body}</Markdown>
          </div>

          {/* // will need for styling etc.
          <p>{post.post.deleted}</p>
          <p>{post.post.nsfw}</p>
          <p>{post.post.removed}</p> */}
        </div>

        <div className="flex gap-4 text-xs font-extrabold text-neutral-content-strong">
          <div className="flex justify-center items-center rounded-2xl bg-secondary-background">
            <button className="p-2 rounded-full hover:text-action-upvote hover:bg-secondary-background-hover">
              <Upvote />
            </button>
            <span>{post.counts.upvotes}</span>
            <button className="p-2 rounded-full hover:text-action-downvote hover:bg-secondary-background-hover">
              <Downvote />
            </button>
          </div>

          <button className="flex justify-center items-center gap-1 py-2 px-4 rounded-2xl bg-secondary-background hover:bg-secondary-background-hover">
            <Comment />
            <span>{post.counts.comments}</span>
          </button>

          <button className="flex justify-center items-center gap-1.5 py-2 px-4 rounded-2xl bg-secondary-background hover:bg-secondary-background-hover">
            <Share />
            <span>Share</span>
          </button>
        </div>
      </div>

      <CommentsSection totalCount={post.counts.comments} postId={post.post.id} />

      {isImageOpen && (
        <ImageViewer
          closeImage={() => {
            setIsImageOpen(false);
          }}
          post={post}
        />
      )}
    </div>
  );
}
