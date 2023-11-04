import Fastify from 'fastify';

import type { FastifyCookieOptions } from '@fastify/cookie';

import cors from '@fastify/cors';
import auth from '@fastify/auth';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';

import routes from './routes/v1/';
import authRoutes from './routes/v1/auth';

const API_VERSION = '/v' + process.env.API_VERSION;

export const fastify = Fastify({
  logger: true,
});

// cookies
fastify.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {
    secure: process.env.NODE_ENV == 'production',
    httpOnly: true,
    path: API_VERSION,
  },
} as FastifyCookieOptions);

// cors
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// auth
fastify.register(auth);
fastify.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

// routes
fastify.register(routes, { prefix: API_VERSION });
fastify.register(authRoutes, { prefix: API_VERSION });
