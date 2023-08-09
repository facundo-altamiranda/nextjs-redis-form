import redis, { REDIS_KEY } from '../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  await redis.set(REDIS_KEY, body);
  // console.log(data);
  // return res.status(200).json({ data: body });
  res.json({ message: 'Hello from Next.js!' });
};
