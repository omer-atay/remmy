import { Link } from 'wouter';
import { AppLogo } from '../../icons/AppLogo';
import { ThreeDot } from '../../icons/ThreeDot';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { LoginModal } from '../Modal/LoginModal';
import { SignupModal } from '../Modal/SignupModal';
import { Searchbar } from '../Searchbar/Searchbar';

export function Header() {
  const [isLoginShown, setIsLoginShown] = useState(false);
  const [isSignupShown, setIsSignupShown] = useState(false);

  return (
    <>
      <header className="px-4 bg-neutral-background border-0 border-b border-neutral-border sticky top-0 h-14 z-1000">
        <nav className="flex justify-between items-center size-full">
          <Link href="/" className="flex justify-center items-center gap-2">
            <img src={logo} height={35} width={35} alt="logo" />
            <AppLogo height={20} className="text-global-white" />
          </Link>

          <Searchbar />

          <div className="flex items-center justify-end gap-6">
            <button
              onClick={() => {
                setIsLoginShown(true);
              }}
              className="flex justify-center items-center px-3 py-2.5 rounded-full text-sm font-bold text-danger-content-default bg-brand-background hover:bg-brand-background-hover"
              type="button"
            >
              Log In
            </button>

            <button
              className="flex justify-center items-center size-10 p-2 text-secondary-plain hover:text-secondary-plain hover:bg-secondary-background-hover rounded-full"
              type="button"
              title="More"
            >
              <ThreeDot size={20} />
              <span className="sr-only">More</span>
            </button>
          </div>
        </nav>
      </header>

      {isLoginShown && (
        <LoginModal
          onClose={() => {
            setIsLoginShown(false);
          }}
          showSignupModal={() => {
            setIsLoginShown(false);
            setIsSignupShown(true);
          }}
        />
      )}

      {isSignupShown && (
        <SignupModal
          onClose={() => {
            setIsSignupShown(false);
          }}
          showLoginModal={() => {
            setIsSignupShown(false);
            setIsLoginShown(true);
          }}
        />
      )}
    </>
  );
}
