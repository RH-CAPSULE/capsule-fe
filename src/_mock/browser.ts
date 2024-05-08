import { setupWorker } from 'msw/browser';
import { signInHandler } from './auth/signin';
import { userInfoHandler } from './auth/user-info';
import { capsuleBoxHandler } from './capsule/capsule-box';
import {signUpHandler} from "./auth/signup";

const handlers = [signInHandler,signUpHandler, userInfoHandler, capsuleBoxHandler];

export const worker = setupWorker(...handlers);
