import { setupWorker } from 'msw/browser';
import { signInHandler } from './auth/signin';
import { userInfoHandler } from './auth/user-info';
import { capsuleBoxHandler } from './capsule/capsule-box';
import { signUpHandler } from './auth/signup';
import { sendEmailHandler } from './auth/send-email';
import { verifyEmailHandler } from './auth/verify-email';

const handlers = [
  signInHandler,
  signUpHandler,
  userInfoHandler,
  capsuleBoxHandler,
  sendEmailHandler,
  verifyEmailHandler,
];

export const worker = setupWorker(...handlers);
