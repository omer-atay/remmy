import { CommentFilter, MainFilter, TopFilter, usePostFilterParams } from '../../usePostFilterParams';

export function PostFilterSection() {
  const { selectedMainFilter, selectedCommentFilter, selectedTopFilter, setFilter } = usePostFilterParams();

  return (
    <div className="flex gap-4 ml-2">
      <select
        className="p-2 font-semibold text-xs text-neutral-content-weak hover:bg-secondary-background-hover hover:cursor-pointer rounded-4xl"
        aria-label="Main filter"
        value={selectedMainFilter}
        onChange={(e) => {
          setFilter('mainFilter', e.target.value);
        }}
      >
        <option value={MainFilter.Active}>Active</option>
        <option value={MainFilter.Controversial}>Controversial</option>
        <option value={MainFilter.Hot}>Hot</option>
        <option value={MainFilter.New}>New</option>

        <option value={MainFilter.Old}>Old</option>
        <option value={MainFilter.Scaled}>Scaled</option>
        <option value={MainFilter.Comments}>Comments</option>
        <option value={MainFilter.Top}>Top</option>
      </select>

      {selectedMainFilter === MainFilter.Comments && (
        <select
          className="p-2 font-semibold text-xs text-neutral-content-weak hover:bg-secondary-background-hover hover:cursor-pointer rounded-4xl"
          aria-label="Comment filter"
          value={selectedCommentFilter}
          onChange={(e) => {
            setFilter('commentFilter', e.target.value);
          }}
        >
          <option value={CommentFilter.Most}>Most</option>
          <option value={CommentFilter.New}>New</option>
        </select>
      )}

      {selectedMainFilter === MainFilter.Top && (
        <select
          className="p-2 font-semibold text-xs text-neutral-content-weak hover:bg-secondary-background-hover hover:cursor-pointer rounded-4xl"
          aria-label="Top filter"
          value={selectedTopFilter}
          onChange={(e) => {
            setFilter('topFilter', e.target.value);
          }}
        >
          <option value={TopFilter.All}>All</option>
          <option value={TopFilter.Day}>Day</option>
          <option value={TopFilter.Hour}>Hour</option>
          <option value={TopFilter.Month}>Month</option>
          <option value={TopFilter.NineMonths}>Nine Months</option>
          <option value={TopFilter.SixHour}>Six Hours</option>
          <option value={TopFilter.SixMonths}>Six Months</option>
          <option value={TopFilter.ThreeMonths}>Three Months</option>
          <option value={TopFilter.TwelveHour}>Twelve Hours</option>
          <option value={TopFilter.Week}>Week</option>
          <option value={TopFilter.Year}>Year</option>
        </select>
      )}
    </div>
  );
}
