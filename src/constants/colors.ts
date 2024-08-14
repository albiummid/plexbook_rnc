import color from 'color';

export const colors = {
  primary: 'orange',
  secondary: 'cyan',
  font_light: 'black',
  font_dark: 'white',
  active_tint: color('orange').alpha(0.1).hex(),
  inactive_tint: color('gray').alpha(0.1).hex(),
};
