const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_MONTH * 12;

export function getTime(timeInput: string) {
  const diffInMs = new Date().getTime() - new Date(timeInput).getTime();
  const formatter = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'always',
    style: 'short',
  });

  if (diffInMs > ONE_YEAR) {
    return formatter.format(Math.ceil(-diffInMs / ONE_YEAR), 'year');
  }

  if (diffInMs > ONE_MONTH) {
    return formatter.format(Math.ceil(-diffInMs / ONE_MONTH), 'month');
  }

  if (diffInMs > ONE_WEEK) {
    return formatter.format(Math.ceil(-diffInMs / ONE_WEEK), 'week');
  }

  if (diffInMs > ONE_DAY) {
    return formatter.format(Math.ceil(-diffInMs / ONE_DAY), 'day');
  }

  if (diffInMs > ONE_HOUR) {
    return formatter.format(Math.ceil(-diffInMs / ONE_HOUR), 'hour');
  }

  if (diffInMs > ONE_MINUTE) {
    return formatter.format(Math.ceil(-diffInMs / ONE_MINUTE), 'minute');
  }

  return formatter.format(Math.ceil(-diffInMs / 1000), 'second');
}

export function getDate(publish_date: string) {
  const date = new Date(publish_date);
  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
  return formatter.format(date);
}
