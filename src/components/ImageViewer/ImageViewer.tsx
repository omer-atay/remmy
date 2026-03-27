import type { PostView } from 'lemmy-js-client';
import { X } from 'lucide-react';
import { ScrollLock } from '../ScrollLock/ScrollLock';

export function ImageViewer({ post, closeImage }: { post: PostView; closeImage: () => void }) {
  return (
    <div className="flex justify-center w-full h-full aspect-4/3 fixed inset-0 z-1000">
      <ScrollLock />
      <button
        onClick={closeImage}
        className="flex justify-center items-center w-12 h-12 z-2000 fixed right-2 top-2 bg-black/60 text-white rounded-full hover:bg-black/80 active:bg-black/10"
      >
        <X size={26} />
        <span className="sr-only">Close image</span>
      </button>
      <img className="z-1000 max-w-[85%]" src={post.post.url} alt="" />
      <img className="w-full h-full absolute blur-xl scale-[1.2] object-cover" src={post.post.url} alt="" />
    </div>
  );
}
