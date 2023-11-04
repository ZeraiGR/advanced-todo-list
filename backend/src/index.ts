import closeWithGrace from 'close-with-grace';
import { fastify } from './fastify';

const SECONDS_DELAY_FOR_STOP_WITH_GRACE = Number(process.env.SECONDS_DELAY_FOR_STOP_WITH_GRACE);

const start = async () => {
  try {
    // host: '0.0.0.0', чтобы сделать доступным снаружи контейнера (https://github.com/moby/moby/issues/2522)
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
    console.log(`*^!@4=> Process id: ${process.pid}`);

    closeWithGrace({ delay: SECONDS_DELAY_FOR_STOP_WITH_GRACE }, async function ({ signal, err }) {
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
