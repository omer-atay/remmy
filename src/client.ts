import { LemmyHttp } from "lemmy-js-client";

const baseUrl = "https://lemmy.world";
export const client = new LemmyHttp(baseUrl);
