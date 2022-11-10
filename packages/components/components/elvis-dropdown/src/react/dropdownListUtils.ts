import { DropdownItem } from './elviaDropdown.types';

export const flattenTree = (tree: DropdownItem[] = [], flatList: DropdownItem[] = []): DropdownItem[] => {
  tree.forEach((item) => {
    flatList.push(item);

    if (item.children) {
      flattenTree(item.children, flatList);
    }
  });
  return flatList;
};
