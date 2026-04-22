import type { PostView } from 'lemmy-js-client';
import { PostCard } from '../PostCard/PostCard';

export function PostsSection({ posts }: { posts: PostView[] }) {
  return (
    <div>
      {posts.map((post) => {
        return <PostCard key={post.post.id} post={post} />;
      })}
    </div>
  );
}
