export function getEditedNumber(number: number) {
  if (number < 1000) {
    return number;
  }

  const editedNumber = (number / 1000).toFixed(1).replace(/\.0$/, '');

  return `${editedNumber}K`;
}
