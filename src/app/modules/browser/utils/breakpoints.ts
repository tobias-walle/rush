import { Breakpoints } from '../constants/breakpoints';

/**
 * Get the breakpoint label for a specific width.
 * @param widthInPixels The width in Pixels.
 * @return {string} The breakpoint label (xs, sm, etc.)
 */
export function getBreakpoint(widthInPixels: number): string {
  // xl, lg, ...
  let breakpoints = Object.keys(Breakpoints).reverse();

  for (let breakpoint of breakpoints) {
    let pixels = Breakpoints[breakpoint];
    if (widthInPixels > pixels) {
      return breakpoint;
    }
  }
  return 'xs';
}