import type { PostView } from 'lemmy-js-client';

export function ExternalPostPageBody({ post, externalName }: { post: PostView; externalName: string }) {
  return (
    <div className="flex flex-col border border-neutral-border-weak rounded-2xl">
      <a href={post.post.url}>
        <img className="flex justify-center w-full relative rounded-t-2xl" src={post.post.thumbnail_url} alt="" />
      </a>

      <div className="flex justify-between px-4 py-2 text-sm">
        <a className="flex justify-between items-center w-full" href={post.post.url} target="_blank">
          <span className="text-neutral-content-weak hover:underline">{externalName}</span>
          <button className="flex justify-between items-center px-3 py-2 font-semibold border border-neutral-border-medium rounded-full text-secondary-plain hover:text-secondary-plain-hover active:bg-secondary-background-selected">
            Open
          </button>
        </a>
      </div>
    </div>
  );
}
