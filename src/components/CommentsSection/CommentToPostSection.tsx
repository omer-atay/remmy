import { useState, type ChangeEvent } from 'react';
import { client, LOGIN_KEY } from '../../client';
import { commentQueries, postQueries } from '../../queries';
import type { CreateComment, PostView } from 'lemmy-js-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useLocalStorage } from 'usehooks-ts';

export function CommentToPostSection({ post }: { post: PostView }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const [loginToken] = useLocalStorage<string | null>(LOGIN_KEY, null);

  const commentMutation = useMutation({
    mutationFn: async (variables: CreateComment) => {
      return client.createComment(variables);
    },
  });

  const makeComment = () => {
    commentMutation.mutate(
      {
        post_id: post.post.id,
        content: message,
      },
      {
        onSettled: () => {
          void queryClient.invalidateQueries(
            postQueries.detail({
              id: post.post.id,
            }),
          );

          void queryClient.invalidateQueries({ queryKey: commentQueries.all() });
        },
      },
    );
  };

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    makeComment();

    setIsExpanded(false);
    setMessage('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        'flex flex-col max-w-180 mt-4 px-4 md:px-0',
        isExpanded && 'border border-neutral-content-weak rounded-2xl',
      )}
    >
      <label>
        <textarea
          onChange={onMessageChange}
          value={message}
          onFocus={() => {
            setIsExpanded(true);
          }}
          className={clsx(
            'px-3 pt-3 w-full min-h-11 h-11 text-sm text-neutral-content-strong border border-neutral-border rounded-3xl',
            isExpanded && 'px-4 border-0 outline-none',
          )}
          disabled={loginToken === null}
          placeholder="Join the conversation"
        />
        <span className="sr-only">Make a comment</span>
      </label>

      {isExpanded && (
        <div className="flex justify-end items-center gap-2 px-2 pb-1">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMessage('');
                setIsExpanded(false);
              }}
              className="h-7 px-2 text-xs font-semibold text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover rounded-full "
              type="button"
            >
              Cancel
            </button>

            <button
              className="h-7 px-2 text-xs font-semibold text-neutral-content-strong bg-brand-background hover:bg-brand-background-hover rounded-full"
              type="submit"
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
