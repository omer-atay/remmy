import type { GetCommunityResponse, GetPostResponse } from 'lemmy-js-client';
import { Cake } from '../../icons/Cake';
import { World } from '../../icons/World';
import { Markdown } from '../Markdown/Markdown';
import { PageDetailsSection } from '../PageDetailsSection/PageDetailsSection';

export function CommunityDetails({ community }: { community: GetCommunityResponse | GetPostResponse }) {
  return (
    <PageDetailsSection>
      <div className="flex flex-col px-4 py-5 bg-neutral-background-weak rounded-lg">
        <span className="text-sm font-bold text-neutral-content">{community.community_view.community.title}</span>

        <div className="flex flex-col py-2 gap-1">
          <div className="flex items-center gap-2 text-xs text-neutral-content-weak font-medium">
            <Cake />
            <span>Created {new Date(community.community_view.community.published).toDateString()}</span>
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

        <div className="text-sm text-neutral-content-weak">
          <Markdown>{community.community_view.community.description}</Markdown>
        </div>
      </div>
    </PageDetailsSection>
  );
}
