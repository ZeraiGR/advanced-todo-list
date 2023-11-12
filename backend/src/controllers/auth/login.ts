import { getUser } from '../../repositories/auth';
import { createSession, validatePassword } from '../../services/auth';

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { UserLoginDto } from '../../types';

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { login, password } = request.body as UserLoginDto;
  const ip = request.ip;

  const user = await getUser(login);

  if (!user) {
    return reply.status(401).send({ message: 'Неверный логин или пароль' });
  }

  if (!(await validatePassword(password, user.passwordHash))) {
    return reply.status(401).send({ message: 'Неверный логин или пароль' });
  }

  await createSession(request, ip, user.id);

  return { status: 'success' };
};
