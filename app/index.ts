import pino from 'pino';
import { createConnection, getMongoManager } from 'typeorm';
import fastify, { RouteShorthandOptions } from 'fastify';

import { Player } from './entity/Player';

const logger = pino();

const startDb = async () => {
  try {
    await createConnection();
    logger.info('db connected');
  } catch (err) {
    logger.fatal('error connecting to db', err);
  }
};

interface AddPlayerArgs {
  name: string;
  jersey: number;
  isPlayerGood: boolean;
}

const addPlayer = async (player: AddPlayerArgs) => {
  const playerRepo = getMongoManager().getMongoRepository(Player);
  return await playerRepo.create(player);
};

const server = fastify({ logger: true });

const opts: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        jersey: { type: 'integer' },
        isPlayerGood: { type: 'boolean' },
      },
    },
  },
};

server.get<{ Querystring: AddPlayerArgs }>('/', opts, async (req, reply) => {
  const player = req.query;
  // dynamic checking/validation of query
  const isGood = Object.entries(player).every(([key, value]) => {
    if (key === 'name') {
      return typeof value === 'string';
    }
    if (key === 'jersey') {
      return typeof value === 'number';
    }
    if (key === 'isPlayerGood') {
      return typeof value === 'boolean';
    }
  });

  if (!isGood) {
    return reply.code(400).send();
  }

  try {
    await addPlayer(player);
    reply.code(201).send();
  } catch (err) {
    server.log.info('error adding player');
    server.log.warn(err);
    return reply.code(400).send();
  }
});

server.listen(4000, (err) => {
  if (err) throw err;
  startDb();
});
