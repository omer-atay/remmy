import type { PostView } from 'lemmy-js-client';
import { PostCardTitle } from './PostCardTitle';
import { Markdown } from '../Markdown/Markdown';

export function TextPostCardBody({ post }: { post: PostView }) {
  return (
    <div>
      <PostCardTitle>{post.post.name}</PostCardTitle>
      <div className="text-sm">
        <Markdown>{post.post.body}</Markdown>
      </div>
    </div>
  );
}
