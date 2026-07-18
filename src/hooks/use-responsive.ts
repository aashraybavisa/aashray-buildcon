import { useWindowDimensions } from 'react-native';

import { breakpoints } from '@/theme/tokens';

/** Responsive helpers derived from the current window width. */
export function useResponsive() {
  const { width } = useWindowDimensions();
  return {
    width,
    isNarrow: width < breakpoints.sm, // phones
    isTablet: width >= breakpoints.sm && width < breakpoints.md,
    isDesktop: width >= breakpoints.md,
    /** columns for service/project grids */
    gridCols: width >= breakpoints.md ? 3 : width >= breakpoints.sm ? 2 : 1,
  };
}
