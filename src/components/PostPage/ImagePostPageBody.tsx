import type { PostView } from 'lemmy-js-client';
import { MediaContainer } from '../MediaContainer/MediaContainer';

export function ImagePostPageBody({ post, openImage }: { post: PostView; openImage: () => void }) {
  return (
    <MediaContainer>
      <div className="flex justify-center w-full h-full aspect-4/3 relative">
        <button onClick={openImage} aria-hidden className="absolute inset-0 z-10" />
        <img src={post.post.url} className="z-1" alt="" />
        <img className="w-full h-full absolute blur-xl object-cover scale-[1.2]" src={post.post.url} alt="" />
      </div>
    </MediaContainer>
  );
}
