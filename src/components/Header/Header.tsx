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
import { useSignup } from '../../contexts/useSignupContext';
import { Menu } from 'lucide-react';
import { SidebarMobile } from '../Sidebar/SidebarMobile';

export function Header() {
  const [isLoginShown, setIsLoginShown] = useState(false);
  const { isSignupShown, setIsSignupShown } = useSignup();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, isLoading: isLoadingUser } = useQuery(siteQuery);

  const myUser = data?.my_user?.local_user_view.person;

  return (
    <>
      <header className="flex justify-between gap-4 px-4 bg-neutral-background border-0 border-b border-neutral-border sticky top-0 h-14 z-1000">
        <nav className="flex justify-between items-center gap-6 size-full">
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => {
                setIsSidebarOpen((prev) => !prev);
              }}
              className="hover:bg-secondary-background-hover active:bg-secondary-background-selected p-2 rounded-full"
              title="Open navigation"
            >
              <Menu size={20} className="flex xl:hidden text-neutral-content-strong" />
              <span className="sr-only">Open navigation</span>
            </button>

            <Link href="/" className="flex justify-center items-center gap-2">
              <img src={logo} height={35} width={35} alt="logo" />
              <AppLogo height={20} className="text-global-white hidden sm:flex" />
            </Link>
          </div>

          <Searchbar />

          {isLoadingUser && <div />}

          {!isLoadingUser && (
            <div className="flex items-center justify-end gap-2">
              {!myUser && (
                <DefaultHeaderButtonsSection
                  openLogin={() => {
                    setIsLoginShown(true);
                  }}
                  openSignup={() => {
                    setIsSignupShown(true);
                  }}
                />
              )}

              {myUser && <MyUserHeaderSection myUser={myUser} />}
            </div>
          )}
        </nav>
      </header>

      {isSidebarOpen && (
        <SidebarMobile
          onClose={() => {
            setIsSidebarOpen(false);
          }}
        />
      )}

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
