import { userQueries } from '../../queries';
import { useQuery } from '@tanstack/react-query';
import { ThreeDot } from '../../icons/ThreeDot';
import { CirclePlus } from 'lucide-react';
import { PostsSection } from '../PostsSection/PostsSection';
import { PageDetailsSection } from '../PageDetailsSection/PageDetailsSection';
import { Markdown } from '../Markdown/Markdown';

export function CreatorPage({ username }: { username: string }) {
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
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 mt-16">
      <div>
        <p>SIDEBAR</p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-4">
          {creator.person_view.person.avatar ? (
            <img
              className="size-16 border-2 border-neutral-border-weak rounded-full"
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

      <PageDetailsSection>
        {creator.person_view.person.banner && (
          <img className="h-full w-full object-cover object-center" src={creator.person_view.person.banner} alt="" />
        )}

        <div className="flex flex-col px-4">
          <div className="flex justify-between items-center gap-2 my-3">
            <span className="font-bold text-neutral-content-strong">{creator.person_view.person.name}</span>

            <button className="p-2 rounded-full bg-neutral-background-highlighted-strong hover:bg-secondary-background-hover">
              <ThreeDot />
            </button>
          </div>

          <button className="flex justify-center items-center w-fit gap-2 py-2 px-3 text-xs text-global-white font-bold bg-primary-background rounded-2xl hover:bg-primary-background-hover">
            <CirclePlus size={16} />
            <span>Follow</span>
          </button>

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

            <div className="flex flex-col">
              <span className="text-neutral-content-strong font-bold">{creator.person_view.person.published}</span>
              {/* todo: display correct age */}
              <span className="text-xs text-neutral-content-weak font-medium">Lemmy Age</span>
            </div>
          </div>
        </div>
      </PageDetailsSection>
    </div>
  );
}
