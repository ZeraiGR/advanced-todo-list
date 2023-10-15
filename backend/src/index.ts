import closeWithGrace from 'close-with-grace';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

const SECONDS_DELAY = 20000;
const SECONDS_DELAY_FOR_STOP = 25000;

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async function handler(request, reply) {
  return { hello: 'hello world!' };
});

fastify.get('/ping', async (request, reply) => {
  return { answer: 'pong!' };
});

fastify.get('/delayed', async (request, reply) => {
  await sleep(SECONDS_DELAY);
  return { hello: 'delayed world' };
});

const start = async () => {
  try {
    await fastify.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    // host: '0.0.0.0', чтобы сделать доступным снаружи контейнера (https://github.com/moby/moby/issues/2522)
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
    console.log(`*^!@4=> Process id: ${process.pid}`);

    closeWithGrace({ delay: SECONDS_DELAY_FOR_STOP }, async function ({ signal, err }) {
      if (err) console.error(err);
      console.log('signal:', signal);
      // wait 'till close db connections...
      // etc
      await fastify.close();
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
