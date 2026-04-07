import { useState } from 'react';
import { PostCardTitle } from './PostCardTitle';
import { MediaContainer } from '../MediaContainer/MediaContainer';
import type { PostView } from 'lemmy-js-client';
import { ImageViewer } from '../ImageViewer/ImageViewer';

export function ImagePostCardBody({ post }: { post: PostView }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div>
      <PostCardTitle>{post.post.name}</PostCardTitle>
      <MediaContainer>
        <div className="flex justify-center w-full h-full aspect-4/3 relative">
          <button
            onClick={() => {
              setIsImageOpen(true);
            }}
            aria-hidden
            className="absolute inset-0 z-10"
          />
          <img src={post.post.url} className="z-1" alt="" />
          <img className="w-full h-full absolute blur-xl object-cover scale-[1.2]" src={post.post.url} alt="" />
        </div>
      </MediaContainer>

      {isImageOpen && (
        <ImageViewer
          onClose={() => {
            setIsImageOpen(false);
          }}
          src={post.post.url ?? ''}
        />
      )}
    </div>
  );
}
