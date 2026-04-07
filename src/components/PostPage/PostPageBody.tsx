import type { PostView } from 'lemmy-js-client';
import ReactPlayer from 'react-player';
import { TextPostPageBody } from './TextPostPageBody';
import { ImagePostPageBody } from './ImagePostPageBody';
import { VideoPostPageBody } from './VideoPostPageBody';
import { EmbedPostPageBody } from './EmbedPostPageBody';
import { ExternalPostPageBody } from './ExternalPostPageBody';

export function PostPageBody({ post, openImage }: { post: PostView; openImage: () => void }) {
  if (!post.post.url_content_type) {
    return <TextPostPageBody post={post} />;
  }

  if (post.post.url_content_type.startsWith('image/')) {
    return <ImagePostPageBody post={post} openImage={openImage} />;
  }

  if (post.post.url_content_type.startsWith('video/')) {
    return <VideoPostPageBody post={post} />;
  }

  if (post.post.url_content_type.startsWith('text/html') && post.post.url) {
    if (ReactPlayer.canPlay?.(post.post.url)) {
      return <EmbedPostPageBody post={post} />;
    }

    const externalAbsoluteName = new URL(post.post.url ?? '').host.replace(/^www\./, '');

    return <ExternalPostPageBody post={post} externalName={externalAbsoluteName} />;
  }
}
