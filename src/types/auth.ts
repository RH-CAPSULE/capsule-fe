/**
 * 사용자 타입
 */
export interface IUser {
  id: number;
  name: string;
  email: string;
}

/**
 * 이메일 검증 시간 타입
 */
export type Time = Date | number | null | undefined;
