import { DropdownItem, DropdownValue, ValueType } from './elviaDropdown.types';

export const flattenTree = (tree: DropdownItem[] = [], flatList: DropdownItem[] = []): DropdownItem[] => {
  tree.forEach((item) => {
    flatList.push(item);

    if (item.children) {
      flattenTree(item.children, flatList);
    }
  });
  return flatList;
};

export const getValueAsList = (value: DropdownValue): ValueType[] => {
  if (Array.isArray(value)) {
    return value.slice();
  } else if (value) {
    return [value];
  }
  return [];
};
