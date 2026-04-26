import clsx from 'clsx';
import { Image } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { client, LOGIN_KEY } from '../../client';
import type { CreateComment, PostView } from 'lemmy-js-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueries } from '../../queries';

export function MakeCommentSection({ post }: { post: PostView }) {
  const [isCommentFocus, setIsCommentFocus] = useState(false);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: async (variables: CreateComment) => {
      await client.createComment(variables);
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
        },
      },
    );
  };

  const loginToken = localStorage.getItem(LOGIN_KEY);

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    makeComment();

    setIsCommentFocus(false);
    setMessage('');
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={clsx('flex flex-col mt-4', isCommentFocus && 'border border-neutral-content-weak rounded-2xl')}
      >
        <label>
          <textarea
            onChange={onMessageChange}
            value={message}
            onFocus={() => {
              setIsCommentFocus(true);
            }}
            className={clsx(
              'px-3 pt-3 w-full min-h-11 h-11 text-sm text-neutral-content-strong border border-neutral-border rounded-3xl',
              isCommentFocus && 'px-4 border-0 outline-none',
            )}
            disabled={loginToken === null}
            placeholder="Join the conversation"
          />
          <span className="sr-only">Make a comment</span>
        </label>

        {isCommentFocus && (
          <div className="flex justify-between items-center gap-2 px-2 pb-1">
            {/* <label title="Image">
              <input type="file" accept='image/*' alt="" />
            </label> */}
            <Image size={14} />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMessage('');
                  setIsCommentFocus(false);
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
    </div>
  );
}
