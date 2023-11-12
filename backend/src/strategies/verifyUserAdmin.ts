import type { FastifyRequest } from 'fastify';
import { hasUserId, getUserId } from '../utils/session-helpers';
import { getUserById } from '../repositories/auth';

export const verifyUserAdmin = async (request: FastifyRequest) => {
  if (!hasUserId(request)) {
    throw new Error('Authorization error');
  }

  const userId = getUserId(request);
  const user = await getUserById(userId);

  if (!user) {
    throw new Error('Authorization error');
  }

  if (user.role !== 'ADMIN') {
    throw new Error('Permission error');
  }
};
