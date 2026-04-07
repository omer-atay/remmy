import type { PostView } from 'lemmy-js-client';
import { PostCardTitle } from './PostCardTitle';
import { MediaContainer } from '../MediaContainer/MediaContainer';

export function VideoPostCardBody({ post }: { post: PostView }) {
  return (
    <div>
      <PostCardTitle>{post.post.name}</PostCardTitle>
      <MediaContainer>
        <video src={post.post.url} autoPlay controls muted width="100%" height="100%" />
      </MediaContainer>
    </div>
  );
}
