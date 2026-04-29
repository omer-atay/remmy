import type { PostView } from 'lemmy-js-client';
import { MediaContainer } from '../MediaContainer/MediaContainer';
import ReactPlayer from 'react-player';

export function EmbedPostPageBody({ post }: { post: PostView }) {
  return (
    <MediaContainer bleed>
      <ReactPlayer src={post.post.url} width={'100%'} height={'100%'} controls />
    </MediaContainer>
  );
}
