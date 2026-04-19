import type { PersonView } from 'lemmy-js-client';
import { Fragment } from 'react/jsx-runtime';
import { Link } from 'wouter';
import { Divider } from '../Divider/Divider';

export function UsersSection({ users }: { users: PersonView[] }) {
  return (
    <div className="flex flex-col mx-9">
      {users.map((user) => {
        const userAbsoluteName = user.person.local
          ? user.person.name
          : `${user.person.name}@${new URL(user.person.actor_id).host}`;
        return (
          <Fragment key={user.person.id}>
            <li className="flex gap-1 p-4 relative hover:bg-neutral-background-hover rounded-2xl">
              {user.person.avatar && <img className="size-12 rounded-4xl" src={user.person.avatar} alt="" />}
              {!user.person.avatar && (
                <div className="flex justify-center items-center gap-px size-12 mr-1 text-3xl leading-12 font-medium bg-neutral-content-weak text-neutral-content-strong border-neutral-background rounded-full">
                  <span>{user.person.name[0]?.toUpperCase()}</span>
                </div>
              )}

              <div className="flex flex-col">
                <Link
                  className="after:content-[''] after:absolute after:inset-0 after:z-999 mb-2 text-[18px] leading-6 text-neutral-content-strong font-semibold"
                  href={`/u/${userAbsoluteName}`}
                >
                  u/{user.person.name}
                </Link>

                <p className="text-ellipsis overflow-hidden text-sm leading-5 line-clamp-3 text-neutral-content">
                  {user.person.bio}
                </p>

                <div className="flex flex-wrap mt-1 text-xs text-neutral-content-weak">
                  <span>{user.counts.post_count} posts</span>
                  <span className="mx-1">·</span>
                  <span>{user.counts.comment_count} comments</span>
                </div>
              </div>
            </li>
            <Divider />
          </Fragment>
        );
      })}
    </div>
  );
}
