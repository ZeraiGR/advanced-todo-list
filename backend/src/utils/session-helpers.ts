import type { FastifyRequest } from 'fastify';

export const hasUserId = (request: FastifyRequest) => {
  return Boolean(request.session.userId);
};

export const hasIp = (request: FastifyRequest) => {
  return Boolean(request.session.ip);
};

export const hasFingerprint = (request: FastifyRequest) => {
  return Boolean(request.session.fingerprint);
};
