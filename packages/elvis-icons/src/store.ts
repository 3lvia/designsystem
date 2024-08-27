interface IconData {
  svg: string;
}
type IconRegistry = Record<string, IconData>;

let _elviaGlobalIconsStore: IconRegistry = {};

/**
 * Add icons to the global icon store to make them available for use in the `<e-icon>/Icon` component.
 *
 * You can add multiple icons at once. The key of the input object is the icon name corresponding to the `name` prop in the `<e-icon>` component.
 * While this can be any string, it is recommended to use the icon name as the key.
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

export const getIcon = (name: string): IconData | undefined => {
  // Need to check `name` because it can be `undefined` on initial render depending on property vs attribute
  if (name && !_elviaGlobalIconsStore[name]) {
    throw new Error(
      `Icon "${name}" not found. Have you remembered to add it to the global icon store using \`addIcons\`?`,
    );
  }
  return _elviaGlobalIconsStore[name];
};
