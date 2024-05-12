/**
 * enum 대체로 union 타입 사용하기 위한 타입 함수
 */
export type Union<T> = T[keyof T];
