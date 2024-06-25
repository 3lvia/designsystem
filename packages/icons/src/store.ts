interface IconData {
  svg: string;
}
type IconRegistry = Record<string, IconData>;

let _icons: IconRegistry = {};

export const add = (icons: IconRegistry) => {
  _icons = { ..._icons, ...icons };
};

export const get = (name: string) => {
  // TODO: should this throw, or be a silent error?
  if (!_icons[name]) {
    throw new Error(`Icon "${name}" not found`);
  }
  return _icons[name];
};
