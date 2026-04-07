import type { PostView } from 'lemmy-js-client';
import { PostCardTitle } from './PostCardTitle';
import { MediaContainer } from '../MediaContainer/MediaContainer';
import ReactPlayer from 'react-player';

export function EmbedPostCardBody({ post }: { post: PostView }) {
  return (
    <div>
      <PostCardTitle>{post.post.name}</PostCardTitle>
      <MediaContainer>
        <ReactPlayer src={post.post.url} width={'100%'} height={'100%'} controls />
      </MediaContainer>
    </div>
  );
}
