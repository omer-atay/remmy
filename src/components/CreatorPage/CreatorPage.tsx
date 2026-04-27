import { userQueries } from '../../queries';
import { useQuery } from '@tanstack/react-query';
import { PostsSection } from '../PostsSection/PostsSection';
import { PageDetailsSection } from '../PageDetailsSection/PageDetailsSection';
import { Markdown } from '../Markdown/Markdown';
import { Sidebar } from '../Sidebar/Sidebar';
import { PageInfoPanel } from '../PageInfoPanel/PageInfoPanel';
import { Cake } from '../../icons/Cake';
import { getDate } from '../../utils/getTime';

export function CreatorPage({ username }: { username: string }) {
  return (
    <div className="grid grid-cols-[auto_2fr_1fr] gap-4">
      <Sidebar />

      <CreatorMain username={username} />
    </div>
  );
}

function CreatorMain({ username }: { username: string }) {
  const {
    data: creator,
    isLoading,
    isError,
  } = useQuery(
    userQueries.detail({
      username,
    }),
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !creator) {
    return <p>Error, something went wrong</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-4 ml-15">
          {creator.person_view.person.avatar ? (
            <img
              className="size-24 border-2 border-neutral-border-weak rounded-full"
              src={creator.person_view.person.avatar}
              alt=""
            />
          ) : (
            <div className="size-16 bg-neutral-content-weak border-2 border-neutral-border-weak rounded-full" />
          )}

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-neutral-content">
              {creator.person_view.person.display_name ?? creator.person_view.person.name}
            </h1>
            <span className="text-sm font-semibold text-neutral-content-weak">u/{creator.person_view.person.name}</span>
          </div>
        </div>

        <PostsSection posts={creator.posts} />
      </div>

      <PageInfoPanel className="top-14 pt-4">
        <PageDetailsSection>
          {creator.person_view.person.banner && (
            <img className="h-full w-full object-cover object-center" src={creator.person_view.person.banner} alt="" />
          )}

          <div className="flex flex-col px-4">
            <span className="my-3 font-bold text-neutral-content-strong">{creator.person_view.person.name}</span>

            {creator.person_view.person.bio && (
              <>
                <div className="py-3 text-sm leading-5 text-neutral-content-weak">
                  <Markdown>{creator.person_view.person.bio}</Markdown>
                </div>

                <hr className="border-neutral-border-weak" />
              </>
            )}

            <div className="grid grid-cols-2 grid-rows-2 py-2 my-3">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-content-strong font-bold">
                  {creator.person_view.counts.post_count}
                </span>
                <span className="text-xs text-neutral-content-weak font-medium">Contributions</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-content-strong font-bold">
                  {creator.person_view.counts.comment_count}
                </span>
                <span className="text-xs text-neutral-content-weak font-medium">Comments</span>
              </div>

              <div className="flex items-center gap-1">
                <Cake />
                <span className="text-xs font-medium">Created {getDate(creator.person_view.person.published)}</span>
              </div>
            </div>
          </div>
        </PageDetailsSection>
      </PageInfoPanel>
    </>
  );
}
