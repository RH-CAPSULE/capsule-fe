// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw/browser';
import { signInHandler } from './auth/signin';

const handlers = [signInHandler];

export const worker = setupWorker(...handlers);
