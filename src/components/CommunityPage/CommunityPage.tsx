import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Plus } from 'lucide-react';
import { communityQueries, postQueries } from '../../queries';
import { Cake } from '../../icons/Cake';
import { World } from '../../icons/World';
import { PostsSection } from '../PostsSection/PostsSection';

export function CommunityPage() {
  const { communityName } = useParams<{ communityName: string }>();

  const {
    data: community,
    isLoading,
    isError,
  } = useQuery(
    communityQueries.detail({
      name: communityName,
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !community) {
    return <p>Error, something went wrong</p>;
  }

  return (
    <div className="max-w-5xl mt-2 mx-auto">
      <div className="w-full h-32">
        {community.community_view.community.banner ? (
          <img
            className="h-full w-full object-cover object-center rounded-md"
            src={community.community_view.community.banner}
            alt=""
          />
        ) : (
          <div className="w-full h-16 bg-secondary-background rounded-md" />
        )}

        <div className="flex justify-between relative py-3">
          <div className="flex justify-center items-center gap-4">
            <img
              className="size-24 border-4 absolute left-4 bottom-2 border-neutral-background rounded-full"
              src={community.community_view.community.icon}
              alt=""
            />

            <h2 className="text-3xl font-bold absolute left-28 text-neutral-content-strong">
              c/{community.community_view.community.name}
            </h2>
          </div>

          <div className="flex justify-center items-center gap-4">
            <button className="flex justify-center items-center gap-2 text-secondary-plain text-sm font-bold border border-neutral-border-medium rounded-3xl py-1.5 px-2 hover:text-secondary-plain-hover hover:border-secondary-plain-hover">
              <Plus size={24} strokeWidth={1.75} />
              <span>Create Post</span>
            </button>

            <button className="flex justify-center items-center py-2 px-3.5 text-sm text-global-white font-bold bg-primary-background rounded-3xl hover:bg-primary-background-hover">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[3fr_1fr] mt-16">
        <CommunityPosts communityName={communityName} />

        <aside className="flex flex-col w-xs px-4 py-5 bg-neutral-background-weak rounded-lg">
          <span className="text-sm font-bold text-neutral-content">{community.community_view.community.title}</span>

          <div className="flex flex-col py-2 gap-1">
            <div className="flex items-center gap-2 text-xs text-neutral-content-weak font-medium">
              <Cake />
              <span>Created {community.community_view.community.published}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-content-weak font-medium">
              <World />
              <span>{community.community_view.community.visibility}</span>
            </div>
          </div>

          <div className="flex gap-10 pb-3">
            <div className="flex flex-col">
              <span className="text-sm text-neutral-content-strong font-bold">
                {community.community_view.counts.subscribers}
              </span>

              <span className="text-xs text-neutral-content-weak">Subscribers</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-neutral-content-strong font-bold">
                {community.community_view.counts.users_active_week}
              </span>

              <span className="text-xs text-neutral-content-weak">Weekly visitors</span>
            </div>
          </div>

          <hr className="border-neutral-border-weak" />

          <p className="text-sm text-neutral-content-weak">{community.community_view.community.description}</p>
        </aside>
      </div>
    </div>
  );
}

function CommunityPosts({ communityName }: { communityName: string }) {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery(
    postQueries.list({
      sort: 'TopDay',
      type_: 'Local',
      community_name: communityName,
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !posts) {
    return <p>Error, something went wrong</p>;
  }

  return <PostsSection posts={posts.posts} source="creator" />;
}
