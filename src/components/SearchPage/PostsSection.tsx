import type { PostView } from 'lemmy-js-client';
import { PostCard } from '../PostCard/PostCard';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';
import { CommunityListSection } from '../CommunityListSection/CommunityListSection';

export function PostsSection({ posts }: { posts: PostView[] }) {
  return (
    <div className="flex gap-8">
      <div>
        {posts.map((post) => {
          return <PostCard key={post.post.id} post={post} />;
        })}
      </div>
      <PageInfoPanel className="top-14 h-[calc(100vh-86px)]">
        <CommunityListSection />
      </PageInfoPanel>
    </div>
  );
}
