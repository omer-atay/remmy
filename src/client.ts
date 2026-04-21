import { LemmyHttp } from 'lemmy-js-client';

const jwt = localStorage.getItem('jwt') ?? '';

const baseUrl = 'https://lemmy.world';
export const client = new LemmyHttp(baseUrl);

client.setHeaders({ jwt });
