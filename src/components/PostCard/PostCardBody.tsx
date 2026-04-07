import type { PostView } from 'lemmy-js-client';
import ReactPlayer from 'react-player';
import { TextPostCardBody } from './TextPostCardBody';
import { ImagePostCardBody } from './ImagePostCardBody';
import { VideoPostCardBody } from './VideoPostCardBody';
import { EmbedPostCardBody } from './EmbedPostCardBody';
import { ExternalPostCardBody } from './ExternalPostCardBody';

export function PostCardBody({ post }: { post: PostView }) {
  if (!post.post.url_content_type) {
    return <TextPostCardBody post={post} />;
  }

  if (post.post.url_content_type.startsWith('image/')) {
    return <ImagePostCardBody post={post} />;
  }

  if (post.post.url_content_type.startsWith('video/')) {
    return <VideoPostCardBody post={post} />;
  }

  if (post.post.url_content_type.startsWith('text/html') && post.post.url) {
    if (ReactPlayer.canPlay?.(post.post.url)) {
      return <EmbedPostCardBody post={post} />;
    }

    return <ExternalPostCardBody post={post} />;
  }
}
