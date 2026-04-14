import { Link } from 'wouter';
import { AppLogo } from '../../icons/AppLogo';
import { ThreeDot } from '../../icons/ThreeDot';

export function Header() {
  return (
    <header className="px-4 bg-neutral-background border-0 border-b border-neutral-border sticky top-0 h-14 z-1000">
      <nav className="flex items-center h-full">
          <Link href="/" className="flex justify-center items-center gap-2">
            <img src={logo} height={35} width={35} alt="logo" />
          <AppLogo height={20} className="text-global-white" />
        </Link>

        <div className="h-10 flex-1 py-xs flex justify-stretch">{/* searchbar here */}</div>

        <div className="flex items-center justify-end gap-6">
          <Link
            onClick={(e) => {
              e.preventDefault();
              /* add state */
            }}
            href="/login"
            className="flex justify-center items-center px-3 py-2.5 rounded-full text-sm font-bold text-danger-content-default bg-brand-background hover:bg-brand-background-hover"
          >
            Log In
          </Link>

          <button className="flex justify-center items-center size-10 p-2 text-secondary-plain hover:text-secondary-plain hover:bg-secondary-background-hover rounded-full">
            <ThreeDot size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
