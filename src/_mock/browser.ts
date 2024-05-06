import { setupWorker } from 'msw/browser';
import { signInHandler } from './auth/signin';
import { userInfoHandler } from './auth/user-info';
import { capsuleBoxHandler } from './capsule/capsule-box';

const handlers = [signInHandler, userInfoHandler, capsuleBoxHandler];

export const worker = setupWorker(...handlers);
