/**
 * Aashray Buildcon — design tokens (React Native).
 * Ported from the design-kit CSS tokens. Brand: safety amber on graphite/charcoal.
 */
import { Platform, type TextStyle } from 'react-native'

/* ---- Raw palette ---- */
export const palette = {
  amber50: '#FFF7E6',
  amber100: '#FDECC4',
  amber200: '#FBDC90',
  amber300: '#F9C64B',
  amber400: '#F6B21F',
  amber500: '#F4A300', // primary
  amber600: '#D98E00',
  amber700: '#B87700',
  amber800: '#8F5D00',

  graphite900: '#14181B',
  graphite800: '#1F2429', // ink base
  graphite700: '#2E353B',
  graphite600: '#454E56',
  graphite500: '#60646C',
  graphite400: '#8A9098',
  graphite300: '#B7BCC2',
  graphite200: '#D8DCE0',
  graphite150: '#E2E5E8',
  graphite100: '#ECEEF0',
  graphite50: '#F6F7F8',
  white: '#FFFFFF',

  success500: '#2E9E5B',
  success50: '#E7F5EC',
  danger500: '#D64545',
  danger50: '#FBE9E9',
  info500: '#208AEF',
  info50: '#E7F1FC',
} as const

/* ---- Semantic colour themes ---- */
export type ThemeColors = {
  surfacePage: string
  surfaceRaised: string
  surfaceCard: string
  surfaceSunken: string
  surfaceInverse: string
  textStrong: string
  textBody: string
  textMuted: string
  textInverse: string
  textOnAccent: string
  accent: string
  accentHover: string
  accentPress: string
  accentSoft: string
  accentBorder: string
  border: string
  borderStrong: string
  focusRing: string
  success: string
  successSoft: string
  danger: string
  dangerSoft: string
  info: string
  infoSoft: string
  bandBg: string
  bandDeep: string
  bandBorder: string
  bandText: string
  bandTextMuted: string
  bandTextFaint: string
}

export const lightColors: ThemeColors = {
  surfacePage: palette.white,
  surfaceRaised: palette.graphite50,
  surfaceCard: palette.white,
  surfaceSunken: palette.graphite100,
  surfaceInverse: palette.graphite800,

  textStrong: palette.graphite900,
  textBody: palette.graphite700,
  textMuted: palette.graphite500,
  textInverse: palette.white,
  textOnAccent: palette.graphite900,

  accent: palette.amber500,
  accentHover: palette.amber600,
  accentPress: palette.amber700,
  accentSoft: palette.amber50,
  accentBorder: palette.amber200,

  border: palette.graphite150,
  borderStrong: palette.graphite300,
  focusRing: palette.amber400,

  success: palette.success500,
  successSoft: palette.success50,
  danger: palette.danger500,
  dangerSoft: palette.danger50,
  info: palette.info500,
  infoSoft: palette.info50,

  // charcoal-band helpers (fixed regardless of theme)
  bandBg: palette.graphite800,
  bandDeep: palette.graphite900,
  bandBorder: palette.graphite700,
  bandText: palette.white,
  bandTextMuted: palette.graphite300,
  bandTextFaint: palette.graphite400,
} as const

export const darkColors: typeof lightColors = {
  surfacePage: palette.graphite900,
  surfaceRaised: palette.graphite800,
  surfaceCard: palette.graphite800,
  surfaceSunken: '#0F1214',
  surfaceInverse: palette.graphite800,

  textStrong: palette.white,
  textBody: palette.graphite200,
  textMuted: palette.graphite400,
  textInverse: palette.graphite900,
  textOnAccent: palette.graphite900,

  accent: palette.amber500,
  accentHover: palette.amber400,
  accentPress: palette.amber300,
  accentSoft: 'rgba(244,163,0,0.16)',
  accentBorder: 'rgba(244,163,0,0.40)',

  border: palette.graphite700,
  borderStrong: palette.graphite600,
  focusRing: palette.amber400,

  success: palette.success500,
  successSoft: 'rgba(46,158,91,0.16)',
  danger: palette.danger500,
  dangerSoft: 'rgba(214,69,69,0.16)',
  info: palette.info500,
  infoSoft: 'rgba(32,138,239,0.16)',

  bandBg: palette.graphite800,
  bandDeep: palette.graphite900,
  bandBorder: palette.graphite700,
  bandText: palette.white,
  bandTextMuted: palette.graphite300,
  bandTextFaint: palette.graphite400,
}

/* ---- Spacing (4-based) ---- */
export const space = {
  half: 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 48,
  8: 64,
  9: 96,
  10: 128,
} as const

/* ---- Radii ---- */
export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
} as const

/* ---- Font families (loaded via @expo-google-fonts in _layout) ---- */
export const fonts = {
  display: 'SplineSans_400Regular',
  displayMedium: 'SplineSans_500Medium',
  displaySemibold: 'SplineSans_600SemiBold',
  displayBold: 'SplineSans_700Bold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  mono: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
} as const

/* ---- Type scale (px) ---- */
export const fontSize = {
  display: 44,
  h1: 36,
  h2: 30,
  h3: 22,
  h4: 20,
  lg: 18,
  base: 16,
  sm: 14,
  xs: 12,
} as const

/* ---- Layout ---- */
export const layout = {
  containerMax: 1200,
  containerNarrow: 760,
  gutter: space[5],
  headerHeight: 68,
} as const

/* ---- Shadows (per scheme) ---- */
type Shadow = Pick<TextStyle, never> & {
  shadowColor: string
  shadowOffset: { width: number; height: number }
  shadowOpacity: number
  shadowRadius: number
  elevation: number
}

export const lightShadows: { sm: Shadow; md: Shadow; lg: Shadow; accent: Shadow } = {
  sm: {
    shadowColor: '#14181B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#14181B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#14181B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    elevation: 10,
  },
  accent: {
    shadowColor: palette.amber500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 20,
    elevation: 6,
  },
}

export const darkShadows: typeof lightShadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 28,
    elevation: 10,
  },
  accent: {
    shadowColor: palette.amber500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
}

/* ---- Breakpoints ---- */
export const breakpoints = { sm: 600, md: 900, lg: 1200 } as const
