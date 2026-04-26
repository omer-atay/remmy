import { Link } from 'wouter';
import { Dropdown } from '../Dropdown/Dropdown';
import type { Person } from 'lemmy-js-client';
import { Divider } from '../Divider/Divider';
import { client, LOGIN_KEY } from '../../client';
import { DoorOpen } from 'lucide-react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function MyUserHeaderSection({ myUser }: { myUser: Person }) {
  const [isMyUserDetailsShown, setIsMyUserDetailsShown] = useState(false);
  const queryClient = useQueryClient();

  const myUserAbsoluteName = myUser.local ? myUser.name : `${myUser.name}@${new URL(myUser.actor_id).host}`;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center gap-2 size-fit relative rounded-full cursor-pointer hover:outline-4 hover:outline-neutral-background-selected">
        <button
          onClick={() => {
            setIsMyUserDetailsShown((prev) => !prev);
          }}
          className="absolute inset-0"
          title="Show your details"
        >
          <span className="sr-only">Show your details</span>
        </button>

        {myUser.avatar && <img className="size-8 rounded-full" src={myUser.avatar} alt="" />}

        {!myUser.avatar && (
          <div className="flex justify-center items-center size-8 text-2xl leading-8 font-medium bg-neutral-content-weak text-secondary border-neutral-background rounded-full">
            {myUser.name[0]?.toUpperCase()}
          </div>
        )}

        {isMyUserDetailsShown && (
          <Dropdown>
            <div className="flex flex-col gap-2">
              <Link href={`/u/${myUserAbsoluteName}`} className="flex items-center gap-2 hover:text-secondary-hover">
                {myUser.avatar && <img className="size-8 rounded-full" src={myUser.avatar} alt="" />}

                {!myUser.avatar && (
                  <div className="flex justify-center items-center size-8 text-2xl leading-8 font-medium bg-neutral-content-weak text-secondary border-neutral-background rounded-full">
                    {myUser.name[0]?.toUpperCase()}
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-sm">View Profile</span>
                  <span className="text-xs font-bold text-secondary-weak">u/{myUser.name}</span>
                </div>
              </Link>

              <Divider />

              <button
                onClick={async () => {
                  await client.logout();
                  client.setHeaders({ Authorization: '' });
                  void queryClient.resetQueries();
                  localStorage.removeItem(LOGIN_KEY);
                }}
                className="flex gap-2 hover:text-secondary-hover"
              >
                <DoorOpen size={18} />
                <span className="text-sm">Log Out</span>
              </button>
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
