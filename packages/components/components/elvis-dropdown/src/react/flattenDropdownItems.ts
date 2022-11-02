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
