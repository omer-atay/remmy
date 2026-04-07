import type { PostView } from 'lemmy-js-client';
import { Markdown } from '../Markdown/Markdown';

export function TextPostPageBody({ post }: { post: PostView }) {
  return (
    <div className="py-2 text-sm leading-5">
      <Markdown>{post.post.body}</Markdown>
    </div>
  );
}
