import { LemmyHttp } from 'lemmy-js-client';

export const LOGIN_KEY = 'loginToken';

const token = localStorage.getItem(LOGIN_KEY);

const baseUrl = 'https://lemmy.world';
export const client = new LemmyHttp(baseUrl);

if (token) {
  client.setHeaders({ Authorization: `Bearer ${JSON.parse(token) as string}` });
}
