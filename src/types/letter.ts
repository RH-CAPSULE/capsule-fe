import { Union } from './union';

// Letter Type assertion
export const Letter = {
  PRIMARY: 'PRIMARY',
  LETTER: 'LETTER',
  BORDER: 'BORDER',
} as const;

export type LetterType = Union<typeof Letter>;
