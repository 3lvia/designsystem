import { DropdownItem, DropdownValue, DropdownValueType } from './publicApi.public';

export const flattenTree = (tree: DropdownItem[] = [], flatList: DropdownItem[] = []): DropdownItem[] => {
  tree.forEach((item) => {
    flatList.push(item);

    if (item.children) {
      flattenTree(item.children, flatList);
    }
  });
  return flatList;
};

export const getValueAsList = (value: DropdownValue): DropdownValueType[] => {
  if (Array.isArray(value)) {
    return value.slice();
  } else if (value) {
    return [value];
  }
  return [];
};

export const getDropdownItemId = (value: DropdownValueType): string => {
  return `ewc-dropdown-item-${value}`;
};
