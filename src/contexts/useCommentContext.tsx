import { createContext, useContext, useState, type ReactNode } from 'react';

interface CommentContextValues {
  isMakingComment: boolean;
  setIsMakingComment: (arg: boolean) => void;
}

const CommentContext = createContext<CommentContextValues | null>(null);

export function useComment() {
  const value = useContext(CommentContext);

  if (!value) {
    throw new Error('useComment must be used within CommentContextProvider');
  }

  return value;
}

export function CommentContextProvider({ children }: { children: ReactNode }) {
  const [isMakingComment, setIsMakingComment] = useState(false);

  return (
    <CommentContext
      value={{
        isMakingComment,
        setIsMakingComment,
      }}
    >
      {children}
    </CommentContext>
  );
}
