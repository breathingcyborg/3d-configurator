import tinycolor from 'tinycolor2';

export function getTextColor(backgroundColor: string) {
  const color = tinycolor(backgroundColor);
  return color.isLight() ? '#000000' : '#FFFFFF';
}