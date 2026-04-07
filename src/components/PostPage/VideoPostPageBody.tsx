import type { PostView } from 'lemmy-js-client';
import { MediaContainer } from '../MediaContainer/MediaContainer';

export function VideoPostPageBody({ post }: { post: PostView }) {
  return (
    <MediaContainer>
      <video src={post.post.url} autoPlay controls muted width="100%" height="100%" />
    </MediaContainer>
  );
}
