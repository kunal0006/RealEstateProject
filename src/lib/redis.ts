import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = new Redis({
  url: url && url.trim() !== "" ? url : "https://dummy.upstash.io",
  token: token && token.trim() !== "" ? token : "dummy_token",
});

export default redis;
