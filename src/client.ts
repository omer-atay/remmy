import { LemmyHttp } from 'lemmy-js-client';

export const LOGIN_KEY = 'loginToken';

const token = localStorage.getItem(LOGIN_KEY);

const baseUrl = 'https://lemmy.world';
export const client = new LemmyHttp(baseUrl);

if (token) {
  client.setHeaders({ Authorization: `Bearer ${JSON.parse(token) as string}` });
}

// client.followCommunity({community_id: id, follow: true})

// both for upvote & downvote. upvote: 1, downvote: -1 remove_vote: 0
// client.likePost({post_id: id, score: 1})

// client.likeComment({post_id: id, score: 1})

// client.createComment({content: 'asdasdas', post_id: id, parent_id?: 2312})

// client.createPost({name: 'asdasd', community_id: id})

// client.deleteAccount({delete_content: true, password: 'asdasdas'})
