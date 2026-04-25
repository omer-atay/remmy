export function DefaultHeaderButtonsSection({ openLogin }: { openLogin: () => void }) {
  return (
    <>
      <button
        onClick={openLogin}
        className="flex justify-center items-center px-3 py-2.5 rounded-full text-sm font-bold text-danger-content-default bg-brand-background hover:bg-brand-background-hover"
        type="button"
      >
        Log In
      </button>
    </>
  );
}
