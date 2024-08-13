interface IconData {
  svg: string;
}
type IconRegistry = Record<string, IconData>;

let _elviaGlobalIconsStore: IconRegistry = {};

export const addIcons = (icons: IconRegistry) => {
  _elviaGlobalIconsStore = { ..._elviaGlobalIconsStore, ...icons };
};

export const getIcon = (name: string) => {
  // TODO: should this throw, or be a silent error?
  if (!_elviaGlobalIconsStore[name]) {
    throw new Error(`Icon "${name}" not found`);
  }
  return _elviaGlobalIconsStore[name];
};
