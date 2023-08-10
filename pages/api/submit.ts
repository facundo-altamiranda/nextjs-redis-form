import { NextApiRequest, NextApiResponse } from "next";

import redis, { REDIS_KEY } from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  await redis.set(REDIS_KEY, body);

  res.status(200).json({ data: body });
};
