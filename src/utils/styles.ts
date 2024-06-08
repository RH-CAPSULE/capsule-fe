import { Theme, ThemeType } from 'src/types/theme';

/** rem to pixel */
export const px = (pixel: number) => `${pixel / 16}rem`;

/** to em */
export const em = (pixel: number) => `${pixel / 16}em`;

/** get theme color */
export const themeColor = (theme?: ThemeType) => {
  if (theme === Theme.AQUA) return '#8db6cc';
  if (theme === Theme.BROWN) return '#d6b89c';
  if (theme === Theme.PURPLE) return '#ac96d6';
  if (theme === Theme.GREIGE) return '#ccc89b';
  if (theme === Theme.MAGENTA) return '#bd284a';
  return 'transparent';
};

/** HEX 색상이 어두운지 밝은지 판별하는 함수 */
export const isDarkColor = (hexColor: string) => {
  // '#' 제거
  if (hexColor.startsWith('#')) {
    hexColor = hexColor.slice(1);
  }

  // HEX 값을 RGB로 변환
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // 밝기 계산 (luminance 공식)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance < 0.5;
};
