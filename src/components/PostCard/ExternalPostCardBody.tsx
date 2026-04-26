import type { PostView } from 'lemmy-js-client';
import { PostCardTitle } from './PostCardTitle';
import { ExternalLink } from 'lucide-react';

export function ExternalPostCardBody({ post }: { post: PostView }) {
  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col min-w-0">
        <PostCardTitle>{post.post.name}</PostCardTitle>
        <a
          className="text-primary hover:text-primary-hover hover:underline z-10 whitespace-nowrap text-ellipsis overflow-hidden"
          href={post.post.url}
          target="_blank"
        >
          {post.post.url}
        </a>
      </div>

      <a target="_blank" className="w-32.5 h-25 shrink-0 grow-0 z-10 relative" href={post.post.url}>
        <img className="size-full object-cover rounded-lg" src={post.post.thumbnail_url} alt="" />
        <div className="p-1 absolute left-1 bottom-1 bg-media-background text-media-onBackground rounded-full">
          <ExternalLink size={12} />
        </div>
      </a>
    </div>
  );
}
