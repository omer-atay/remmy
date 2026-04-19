import clsx from 'clsx';

interface Props {
  name: string;
  selectedOption: string;
  onClick: () => void;
}

export function ViewOptionButton({ name, selectedOption, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex justify-center items-center px-3 py-2 text-sm text-neutral-content-strong font-bold rounded-full',
        selectedOption === name.toLowerCase() ? 'bg-secondary-background-selected' : '',
      )}
      type="button"
    >
      {name}
    </button>
  );
}
