import type { PostSortType } from 'lemmy-js-client';
import { useSearchParams } from 'wouter';

export const enum MainFilter {
  Active = 'Active',
  Hot = 'Hot',
  New = 'New',
  Old = 'Old',
  Controversial = 'Controversial',
  Scaled = 'Scaled',
  Top = 'Top',
  Comments = 'Comments',
}

export const enum CommentFilter {
  Most = 'MostComments',
  New = 'NewComments',
}

export const enum TopFilter {
  Hour = 'TopHour',
  SixHour = 'TopSixHour',
  TwelveHour = 'TopTwelveHour',
  Day = 'TopDay',
  Week = 'TopWeek',
  Month = 'TopMonth',
  ThreeMonths = 'TopThreeMonths',
  SixMonths = 'TopSixMonths',
  NineMonths = 'TopNineMonths',
  Year = 'TopYear',
  All = 'TopAll',
}

type PostFilterType = 'mainFilter' | 'commentFilter' | 'topFilter';

export const usePostFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedMainFilter = (searchParams.get('mainFilter') ?? MainFilter.New) as MainFilter;
  const selectedCommentFilter = (searchParams.get('commentFilter') ?? CommentFilter.Most) as CommentFilter;
  const selectedTopFilter = (searchParams.get('topFilter') ?? TopFilter.Day) as TopFilter;

  const sort: PostSortType =
    selectedMainFilter === MainFilter.Top
      ? selectedTopFilter
      : selectedMainFilter === MainFilter.Comments
        ? selectedCommentFilter
        : selectedMainFilter;

  const setFilter = (filterType: PostFilterType, value: string) => {
    if (filterType === 'mainFilter') {
      setSearchParams({ [filterType]: value });
      return;
    }

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(filterType, value);
      return next;
    });
  };

  return { selectedMainFilter, selectedCommentFilter, selectedTopFilter, setFilter, sort };
};
