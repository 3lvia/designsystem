/**
 * Convert package name from format in componentData-files, to the npm package name.
 */
export const getPackageName = (fullName: string): string => {
  return '@elvia/elvis' + fullName.replace(/([A-Z])/g, '-$1').toLowerCase();
};
