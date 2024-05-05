import { setupWorker } from 'msw/browser';
import { signInHandler } from './auth/signin';
import { userInfoHandler } from './auth/user-info';

const handlers = [signInHandler, userInfoHandler];

export const worker = setupWorker(...handlers);
