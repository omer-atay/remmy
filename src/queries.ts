import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { client } from './client';
import type {
  GetComment,
  GetComments,
  GetCommunity,
  GetPersonDetails,
  GetPost,
  GetPosts,
  ListCommunities,
} from 'lemmy-js-client';

export const communityQueries = {
  all: () => ['communities'],
  lists: () => [...communityQueries.all(), 'list'],
  list: (options: ListCommunities) =>
    queryOptions({
      queryKey: [...communityQueries.lists(), options],
      queryFn: () => client.listCommunities(options),
    }),
  details: () => [...communityQueries.all(), 'detail'],
  detail: (options: GetCommunity) =>
    queryOptions({
      queryKey: [...communityQueries.details(), options],
      queryFn: () => client.getCommunity(options),
    }),
};

export const postQueries = {
  all: () => ['posts'],
  lists: () => [...postQueries.all(), 'list'],
  list: (options: Omit<GetPosts, 'page_cursor' | 'page'>) =>
    infiniteQueryOptions({
      queryKey: [...postQueries.lists(), options],
      queryFn: ({ pageParam }) =>
        client.getPosts({
          ...options,
          page_cursor: pageParam,
        }),
      getNextPageParam: (lastpage) => lastpage.next_page,
      initialPageParam: undefined as string | undefined,
    }),
  details: () => [...postQueries.all(), 'detail'],
  detail: (options: GetPost) =>
    queryOptions({
      queryKey: [...postQueries.details(), options],
      queryFn: () => client.getPost(options),
    }),
};

export const userQueries = {
  all: () => ['users'],
  details: () => [...userQueries.all(), 'detail'],
  detail: (options: GetPersonDetails) =>
    queryOptions({
      queryKey: [...userQueries.details(), options],
      queryFn: () => client.getPersonDetails(options),
    }),
};

export const commentQueries = {
  all: () => ['comments'],
  lists: () => [...commentQueries.all(), 'comment'],
  list: ({ options, totalCount }: { options: Omit<GetComments, 'page'>; totalCount: number }) =>
    infiniteQueryOptions({
      queryKey: [...commentQueries.lists(), options],
      queryFn: ({ pageParam }) => client.getComments({ ...options, page: pageParam }),
      getNextPageParam: (_lastPage, allPages, lastPageParam) => {
        const totalComments = allPages.reduce((acc, page) => acc + page.comments.length, 0);

        if (totalComments < totalCount) {
          return lastPageParam + 1;
        }
      },
      initialPageParam: 1,
    }),
  details: () => [...commentQueries.all(), 'detail'],
  detail: (options: GetComment) =>
    queryOptions({
      queryKey: [...commentQueries.details(), options],
      queryFn: () => client.getComment(options),
    }),
};
