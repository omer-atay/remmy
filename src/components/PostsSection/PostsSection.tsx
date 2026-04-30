import type { PostView } from 'lemmy-js-client';
import { PostCard } from '../PostCard/PostCard';

export function PostsSection({ posts, source = 'community' }: { posts: PostView[]; source?: 'community' | 'creator' }) {
  return (
    <div className="flex flex-col gap-2 w-full sm:w-155 min-w-0 mx-auto">
      {posts.map((post) => {
        return <PostCard key={post.post.id} post={post} source={source} />;
      })}
    </div>
  );
}
