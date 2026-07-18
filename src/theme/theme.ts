/**
 * useTheme — returns the active colour set + shadows for the current colour scheme,
 * plus the shared token groups. Follows the OS colour scheme.
 */
import { useColorScheme } from 'react-native';

import {
  darkColors,
  darkShadows,
  fonts,
  fontSize,
  layout,
  lightColors,
  lightShadows,
  radius,
  space,
  type ThemeColors,
} from './tokens';

export type Theme = {
  scheme: 'light' | 'dark';
  colors: ThemeColors;
  shadows: typeof lightShadows;
  space: typeof space;
  radius: typeof radius;
  fonts: typeof fonts;
  fontSize: typeof fontSize;
  layout: typeof layout;
};

export function useTheme(): Theme {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return {
    scheme,
    colors: scheme === 'dark' ? darkColors : lightColors,
    shadows: scheme === 'dark' ? darkShadows : lightShadows,
    space,
    radius,
    fonts,
    fontSize,
    layout,
  };
}

export { space, radius, fonts, fontSize, layout } from './tokens';
