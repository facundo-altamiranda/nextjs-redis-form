import { Redis } from "@upstash/redis";
import https from "https";

// See documentation at
// https://docs.upstash.com/redis/sdks/javascriptsdk/getstarted#basic-usage
const redis = Redis.fromEnv({
  agent: new https.Agent({ keepAlive: true }),
});

// NOTE: use your full_name as a key prefix when writing to Redis, to avoid collisions.
export const REDIS_KEY = "facundo_altamiranda_data";

export default redis;
