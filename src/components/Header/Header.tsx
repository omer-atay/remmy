import { Link } from 'wouter';
import { AppLogo } from '../../icons/AppLogo';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { LoginModal } from '../Modal/LoginModal';
import { SignupModal } from '../Modal/SignupModal';
import { Searchbar } from '../Searchbar/Searchbar';
import { useQuery } from '@tanstack/react-query';
import { siteQuery } from '../../queries';
import { DefaultHeaderButtonsSection } from './DefaultHeaderButtonsSection';
import { MyUserHeaderSection } from './MyUserHeaderSection';

export function Header() {
  const [isLoginShown, setIsLoginShown] = useState(false);
  const [isSignupShown, setIsSignupShown] = useState(false);

  const { data, isLoading: isLoadingUser } = useQuery(siteQuery);

  const myUser = data?.my_user?.local_user_view.person;

  return (
    <>
      <header className="px-4 bg-neutral-background border-0 border-b border-neutral-border sticky top-0 h-14 z-1000">
        <nav className="flex justify-between items-center size-full">
          <Link href="/" className="flex justify-center items-center gap-2">
            <img src={logo} height={35} width={35} alt="logo" />
            <AppLogo height={20} className="text-global-white" />
          </Link>

          <Searchbar />

          {isLoadingUser && <div />}

          {!isLoadingUser && (
            <div className="flex items-center justify-end gap-6">
              {!myUser && (
                <DefaultHeaderButtonsSection
                  openLogin={() => {
                    setIsLoginShown(true);
                  }}
                />
              )}

              {myUser && <MyUserHeaderSection myUser={myUser} />}
            </div>
          )}
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
