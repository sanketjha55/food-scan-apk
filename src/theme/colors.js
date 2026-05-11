// Color Theme - White, Black, Grey
export const colors = {
  // Primary Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Grey Shades
  grey: {
    50: '#F9F9F9',
    100: '#F3F3F3',
    200: '#E8E8E8',
    300: '#D3D3D3',
    400: '#A9A9A9',
    500: '#808080',
    600: '#666666',
    700: '#404040',
    800: '#2A2A2A',
    900: '#1A1A1A',
  },
  
  // Status Colors
  success: '#27AE60',
  warning: '#F39C12',
  danger: '#E74C3C',
  info: '#3498DB',
  
  // Semantic Colors
  background: '#FFFFFF',
  surface: '#F9F9F9',
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#A9A9A9',
    inverse: '#FFFFFF',
  },
  border: '#E8E8E8',
  shadow: 'rgba(0, 0, 0, 0.15)',
  
  // Transparent variations
  blackOverlay20: 'rgba(0, 0, 0, 0.2)',
  blackOverlay50: 'rgba(0, 0, 0, 0.5)',
  whiteOverlay80: 'rgba(255, 255, 255, 0.8)',
};

export const lightTheme = {
  ...colors,
  isDark: false,
};

export const darkTheme = {
  background: '#1A1A1A',
  surface: '#2A2A2A',
  text: {
    primary: '#FFFFFF',
    secondary: '#D3D3D3',
    tertiary: '#A9A9A9',
    inverse: '#000000',
  },
  ...colors,
  isDark: true,
};
