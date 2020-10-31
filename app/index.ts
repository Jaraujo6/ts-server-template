import pino from 'pino';
import { createConnection } from 'typeorm';
import { Player } from './entity/Player';

const logger = pino();

const startDb = async () => {
  try {
    const connection = await createConnection();
    logger.info('connected');

    const player = new Player();

    player.name = 'Pedro Martinez';
    player.jersey = 24;
    player.isPlayerGood = true;

    const player2 = new Player();
    player2.name = 123;
  } catch (err) {
    logger.fatal('error connecting to db', err);
  }
};

startDb();
