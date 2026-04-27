export function DefaultHeaderButtonsSection({
  openLogin,
  openSignup,
}: {
  openLogin: () => void;
  openSignup: () => void;
}) {
  return (
    <>
      <button
        onClick={openSignup}
        className="flex justify-center items-center px-3 py-2.5 rounded-full text-sm font-bold text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover active:bg-secondary-background-selected"
        type="button"
      >
        Sign Up
      </button>

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
