import { Theme, ThemeType } from 'src/types/theme';

/** rem to pixel */
export const px = (pixel: number) => `${pixel / 16}rem`;

/** get theme color */
export const themeColor = (theme?: ThemeType) => {
  if (theme === Theme.AQUA) return '#8db6cc';
  if (theme === Theme.BROWN) return '#d6b89c';
  if (theme === Theme.PURPLE) return '#ac96d6';
  if (theme === Theme.GREIGE) return '#ccc89b';
  if (theme === Theme.MAGENTA) return '#bd284a';
  return 'transparent';
};
