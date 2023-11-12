import type { FastifyRequest, FastifyReply } from 'fastify';
import type { UserRegisterDto } from '../../types';

import {
  createSession,
  createUser,
  hasUserWithEmail,
  hasUserWithNickname,
  hasUserWithPhone,
} from '../../services/auth';
import { createIpAccountLimit, getAccountLimitByIp, updateIpAccountLimit } from '../../repositories/auth';

const IP_ACCOUNT_LIMIT = Number(process.env.IP_ACCOUNT_LIMIT);

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body as UserRegisterDto;

  const { nickName, phone, email, password, confirmPassword } = body;
  const ip = request.ip;

  if (password !== confirmPassword) {
    return reply.status(400).send({ message: 'Пароли не совпадают' });
  }

  if (await hasUserWithNickname(nickName)) {
    return reply.status(400).send({ message: 'Пользователь c таким nickName уже существует' });
  }

  if (await hasUserWithEmail(email)) {
    return reply.status(400).send({ message: 'Пользователь c таким email уже существует' });
  }

  if (phone && (await hasUserWithPhone(phone))) {
    return reply.status(400).send({ message: 'Пользователь c таким номером телефона уже существует' });
  }

  // Убеждаемся, что у пользователя под уникальлный ip не более 2 учетных записей
  const accountLimit = await getAccountLimitByIp(ip);

  if (!accountLimit) {
    await createIpAccountLimit(ip);
  } else {
    if (accountLimit.accounts >= IP_ACCOUNT_LIMIT) {
      await request.session.destroy();
      return reply.code(403).send({ message: 'Превышен лимит аккаунтов' });
    } else {
      await updateIpAccountLimit(ip);
    }
  }

  const user = await createUser(body);
  request.log.info('A new user was created:', user);

  await createSession(request, ip, user.id);
  request.log.info('A new session was created');

  return { id: user.id };
};
