import * as argon from 'argon2';
import { hasUserId, hasIp, hasFingerprint } from '../utils/session-helpers';

import type { FastifyRequest } from 'fastify';

export async function verifyUserFingerprint(request: FastifyRequest) {
  if (!hasUserId(request) || !hasIp(request) || !hasFingerprint(request)) {
    throw new Error('Authorization error');
  }

  if (!(await argon.verify(request.session.fingerprint, request.fingerprint))) {
    await request.session.destroy();
    throw new Error('Authorization error');
  }
}
