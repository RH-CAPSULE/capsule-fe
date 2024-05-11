/**
 * 사용자 타입
 */
export interface IUser {
  id: number;
  userName: string;
  userEmail: string;
}

/**
 * 이메일 검증 시간 타입
 */
export type Time = Date | number | null | undefined;

export enum EmailVerifyPurpose {
  SIGN_UP = 'SIGN_UP',
  RESET_PASSWORD = 'RESET_PASSWORD',
}
