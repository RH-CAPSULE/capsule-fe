import { Union } from './union';

// Theme Type assertion
export const Theme = {
  AQUA: 'AQUA',
  BROWN: 'BROWN',
  PURPLE: 'PURPLE',
  GREIGE: 'GREIGE',
  MAGENTA: 'MAGENTA',
} as const;

export type ThemeType = Union<typeof Theme>;
