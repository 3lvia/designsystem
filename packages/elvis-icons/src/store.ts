interface IconData {
  svg: string;
}
type IconRegistry = Record<string, IconData>;

let _elviaGlobalIconsStore: IconRegistry = {};

/**
 * Add icons to the global icon store to make them available for use in the `<elvis-icon>/ElvisIcon` component.
 * @param icons - An object of icon names and their corresponding SVG data.
 *
 * @example
 * ```ts
 * import { addIcons } from '@elvis/icons';
 *
 * // import the icon data (SVG string)
 * import { download } from '@elvia/elvis-assets-icons';
 *
 * addIcons({
 *  download: { svg: download.getIcon() }
 * });
 * ```
 */
export const addIcons = (icons: IconRegistry) => {
  _elviaGlobalIconsStore = { ..._elviaGlobalIconsStore, ...icons };
};

export const getIcon = (name: string) => {
  // TODO: should this throw, or be a silent error?
  if (!_elviaGlobalIconsStore[name]) {
    throw new Error(
      `Icon "${name}" not found. Have you remembered to add it to the global icon store using \`addIcons\`?`,
    );
  }
  return _elviaGlobalIconsStore[name];
};
