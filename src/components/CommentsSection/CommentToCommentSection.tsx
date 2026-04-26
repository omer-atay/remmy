import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateComment, Post } from 'lemmy-js-client';
import { Image } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { client } from '../../client';
import { commentQueries, postQueries } from '../../queries';
import { useComment } from '../../contexts/useCommentContext';

interface Props {
  post: Post;
  commentParentName: string;
  commentParentId: number;
}

export function CommentToCommentSection({ post, commentParentName, commentParentId }: Props) {
  const { isMakingComment, setIsMakingComment } = useComment();
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
        post_id: post.id,
        content: message,
        parent_id: commentParentId,
      },
      {
        onSettled: () => {
          void queryClient.invalidateQueries(
            postQueries.detail({
              id: post.id,
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

    setIsMakingComment(false);
    setMessage('');
  };

  return (
    <>
      {isMakingComment && (
        <form onSubmit={onSubmit} className="flex flex-col mt-4 border border-neutral-content-weak rounded-2xl">
          <label>
            <textarea
              onChange={onMessageChange}
              value={message}
              className="px-4 pt-3 w-full min-h-11 h-11 text-sm text-neutral-content-strong border-0 outline-0 rounded-3xl"
              placeholder={`Reply to ${commentParentName}`}
            />
            <span className="sr-only">Make a comment</span>
          </label>

          <div className="flex justify-between items-center gap-2 px-2 pb-1">
            {/* <label title="Image">
              <input type="file" accept='image/*' alt="" />
            </label> */}
            <Image size={14} />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMessage('');
                  setIsMakingComment(false);
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
        </form>
      )}
    </>
  );
}
