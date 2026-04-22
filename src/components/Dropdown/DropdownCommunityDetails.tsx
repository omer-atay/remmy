import { Link } from 'wouter';
import { Divider } from '../Divider/Divider';
import clsx from 'clsx';
import { Markdown } from '../Markdown/Markdown';

interface Props {
  data: {
    banner: string;
    icon: string;
    name: string;
    absoluteName: string;
    description: string;
    subscriberCount?: number;
    weeklyVisitorCount?: number;
  };
}

export function DropdownCommunityDetails({ data }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {data.banner && (
        <img
          className="rounded-t-2xl max-h-30 w-full mx-auto object-cover object-center absolute inset-0"
          src={data.banner}
          alt=""
        />
      )}

      <div className={clsx('flex justify-between items-center relative', data.banner !== '' && 'mt-26')}>
        {data.icon === '' ? (
          <Link className="flex justify-center items-center gap-1" href={`/c/${data.absoluteName}`}>
            <div className="flex justify-center items-center gap-0.5 size-12 outline-8 absolute left-0 text-4xl leading-12 font-extrabold bg-neutral-content text-neutral-background border-neutral-background rounded-full">
              <span className="mb-3">c</span>
              <span className="mb-5">/</span>
            </div>

            <span className="ml-14 text-[0.875rem] leading-6 font-bold text-neutral-content-strong hover:text-primary-hover hover:underline">
              c/{data.name}
            </span>
          </Link>
        ) : (
          <Link className="flex justify-center items-center gap-1" href={`/c/${data.absoluteName}`}>
            <img className="size-12 rounded-full" src={data.icon} alt="" />

            <span className="text-[0.875rem] leading-6 font-bold text-neutral-content-strong hover:text-primary-hover hover:underline">
              c/{data.name}
            </span>
          </Link>
        )}

        <button
          className="flex justify-center items-center w-fit text-xs font-bold py-1 px-3 text-neutral-content-strong bg-secondary-background rounded-2xl hover:bg-secondary-background-hover"
          type="button"
        >
          Join
        </button>
      </div>

      <div className="text-sm leading-5 text-neutral-content line-clamp-10">
        <Markdown>{data.description}</Markdown>
      </div>

      {data.subscriberCount ??
        (data.weeklyVisitorCount && (
          <>
            <Divider />
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span>{data.subscriberCount}</span>
                <span>Subscribers</span>
              </div>

              <div className="flex flex-col">
                <span>{data.weeklyVisitorCount}</span>
                <span>Weekly Visitors</span>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
