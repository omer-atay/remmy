import { LemmyHttp } from 'lemmy-js-client';

export const LOGIN_KEY = 'loginToken';

const jwt = JSON.parse(localStorage.getItem(LOGIN_KEY) ?? '') as string;

const baseUrl = 'https://lemmy.world';
export const client = new LemmyHttp(baseUrl);

client.setHeaders({ Authorization: `Bearer ${jwt}` });
