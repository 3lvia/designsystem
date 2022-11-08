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

export const getTreeDepth = (list: DropdownItem[], level = 0): number => {
  const levels = list.map((listItem) => {
    if (listItem.children) {
      return getTreeDepth(listItem.children, level + 1);
    }
    return level;
  });

  return Math.max(...levels);
};
