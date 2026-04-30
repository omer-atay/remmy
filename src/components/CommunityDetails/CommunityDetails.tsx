import type { GetCommunityResponse, GetPostResponse } from 'lemmy-js-client';
import { Cake } from '../../icons/Cake';
import { World } from '../../icons/World';
import { Markdown } from '../Markdown/Markdown';
import { PageDetailsSection } from '../PageDetailsSection/PageDetailsSection';
import { Fragment } from 'react';
import { Link } from 'wouter';
import { getDate } from '../../utils/getTime';

export function CommunityDetails({ community }: { community: GetCommunityResponse | GetPostResponse }) {
  return (
    <PageDetailsSection>
      <div className="flex flex-col px-4 py-5 bg-neutral-background-weak rounded-lg">
        <span className="text-sm font-bold text-neutral-content">{community.community_view.community.title}</span>

        <div className="flex flex-col py-2 gap-1">
          <div className="flex items-center gap-2 text-xs text-neutral-content-weak font-medium">
            <Cake />
            <span className="text-xs font-medium">Created {getDate(community.community_view.community.published)}</span>
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

        <hr className="border-neutral-border-weak my-4"></hr>

        <div className="flex flex-col gap-2 pt-4">
          <h3 className="mb-3 text-xs font-semibold text-neutral-content-weak">MODERATORS</h3>
          {community.moderators.map((moderator) => {
            const creatorAbsoluteName = moderator.moderator.local
              ? moderator.moderator.name
              : `${moderator.moderator.name}@${new URL(moderator.moderator.actor_id).host}`;
            return (
              <Fragment key={moderator.moderator.id}>
                <div className="flex items-center gap-2">
                  {moderator.moderator.avatar && (
                    <img className="size-8 rounded-full" src={moderator.moderator.avatar} alt="" />
                  )}

                  {!moderator.moderator.avatar && (
                    <div className="flex justify-center items-center size-8 rounded-full font-medium bg-neutral-content-weak text-neutral-content-strong border-neutral-background">
                      <span className="text-neutral-content-strong">{moderator.moderator.name[0]?.toUpperCase()}</span>
                    </div>
                  )}

                  <div className="flex flex-col justify-center">
                    <Link className="text-sm text-neutral-content hover:underline" href={`/u/${creatorAbsoluteName}`}>
                      u/{moderator.moderator.name}
                    </Link>

                    <span className="text-xs text-secondary-weak">{moderator.moderator.display_name}</span>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </PageDetailsSection>
  );
}
