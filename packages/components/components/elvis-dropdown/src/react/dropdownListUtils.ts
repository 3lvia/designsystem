import { DropdownItem } from './elviaDropdown.types';

export const getFlattenedItemList = (
  listToIterate: DropdownItem[] = [],
  itemList: DropdownItem[] = [],
): DropdownItem[] => {
  listToIterate.forEach((item) => {
    itemList.push(item);

    if (item.children) {
      getFlattenedItemList(item.children, itemList);
    }
  });
  return itemList;
};

export const getTreeDepth = (list: DropdownItem[], level = 1): number => {
  const levels = list.map((listItem) => {
    if (listItem.children) {
      return getTreeDepth(listItem.children, level + 1);
    }
    return level;
  });

  return Math.max(...levels);
};
