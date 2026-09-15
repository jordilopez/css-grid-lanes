/**
 * Determines whether the "Safari only" disclaimer should be shown.
 *
 * @param supportsGridLanes - injectable `CSS.supports('display', 'grid-lanes')`
 */
export function shouldShowUnsupportedNotice(
  supportsGridLanes: () => boolean,
): boolean {
  try {
    return !supportsGridLanes();
  } catch {
    // Old browsers without CSS.supports — assume unsupported.
    return true;
  }
}
