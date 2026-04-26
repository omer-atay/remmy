import { Link } from 'wouter';
import { Cake } from '../../icons/Cake';

interface Props {
  data: {
    icon: string;
    name: string;
    absoluteName: string;
    published: string;
    postCount?: number;
    commentCount?: number;
  };
}

export function PopoverUserDetails({ data }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        {data.icon === '' ? (
          <Link href={`/u/${data.absoluteName}`}>
            <div className="flex justify-center items-center gap-px size-12 mr-1 text-3xl leading-12 font-medium bg-neutral-content-weak text-neutral-content-strong border-neutral-background rounded-full">
              <span>{data.name[0]?.toUpperCase()}</span>
            </div>
          </Link>
        ) : (
          <Link href={`/u/${data.absoluteName}`}>
            <img className="size-12 rounded-full" src={data.icon} alt="" />
          </Link>
        )}

        <div className="flex flex-col justify-center">
          <Link
            className="mb-2 text-[18px] text-neutral-content-strong font-bold leading-6 hover:text-primary-hover hover:underline"
            href={`/u/${data.absoluteName}`}
          >
            {data.absoluteName}
          </Link>

          <span className="text-xs text-neutral-content-weak font-bold overflow-hidden whitespace-nowrap">
            u/{data.name}
          </span>

          <span className="flex justify-center items-center gap-1 text-xs text-neutral-content-weak font-bold overflow-hidden whitespace-nowrap">
            <Cake />
            {data.published}
          </span>
        </div>
      </div>

      {data.postCount ??
        (data.commentCount && (
          <div>
            <span>{data.postCount} Contributions</span>
            <span>{data.commentCount} Comments</span>
          </div>
        ))}
    </div>
  );
}
