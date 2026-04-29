import { createContext, useContext, useState, type ReactNode } from 'react';

interface SignupContextValues {
  isSignupShown: boolean;
  setIsSignupShown: (arg: boolean) => void;
}

const SignupContext = createContext<SignupContextValues | null>(null);

export function useSignup() {
  const value = useContext(SignupContext);

  if (!value) {
    throw new Error('useSignup must be used within SignupContextProvider');
  }

  return value;
}

export function SignupContextProvider({ children }: { children: ReactNode }) {
  const [isSignupShown, setIsSignupShown] = useState(false);

  return (
    <SignupContext
      value={{
        isSignupShown,
        setIsSignupShown,
      }}
    >
      {children}
    </SignupContext>
  );
}
