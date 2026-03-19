import { queryOptions } from '@tanstack/react-query';
import { client } from './client';
import type { GetCommunity, GetPersonDetails, GetPost, GetPosts, ListCommunities } from 'lemmy-js-client';

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
  list: (options: GetPosts) =>
    queryOptions({
      queryKey: [...postQueries.lists(), options],
      queryFn: () => client.getPosts(options),
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
