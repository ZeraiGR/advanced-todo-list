// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    fingerprint: string;
  }

  interface Session {
    ip: string;
    userId: string;
    fingerprint: string;
  }
}
