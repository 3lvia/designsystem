const dropdownLoadMoreItemsCode = {
  codeReact: `<Dropdown
  items={[
    { value: 'Nord-Korea', label: 'Nord-Korea' },
    { value: 'Nord-Makedonia', label: 'Nord-Makedonia' },
    { value: 'Norge', label: 'Norge' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Russland', label: 'Russland' },
  ]}
  label={'Label'}
  placeholder={'Placeholder'}
  isLoadingMoreItems={isLoadingMoreItems}
  onLoadMoreItems={() => loadMoreDropdownItems()}
></Dropdown>
`,
  codeAngular: `<elvia-dropdown
  [items]="[
    { value: 'Nord-Korea', label: 'Nord-Korea' },
    { value: 'Nord-Makedonia', label: 'Nord-Makedonia' },
    { value: 'Norge', label: 'Norge' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Russland', label: 'Russland' }
  ]"
  [label]="'Label'"
  [placeholder]="'Placeholder'"
  [isLoadingMoreitems]="isLoadingMoreItems"
  (onLoadMoreItems)="loadMoreDropdownItems()"
></elvia-dropdown>
`,
  codeVue: `<elvia-dropdown
  :items="[
    { value: 'Nord-Korea', label: 'Nord-Korea' },
    { value: 'Nord-Makedonia', label: 'Nord-Makedonia' },
    { value: 'Norge', label: 'Norge' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Russland', label: 'Russland' },
  ]"
  :label="'Label'"
  :placeholder="'Placeholder'"
  :isLoadingMoreitems="isLoadingMoreItems"
  @load-more-items="loadMoreDropdownItems()"
></elvia-dropdown>
`,
  codeNativeHTML: `<elvia-dropdown
  label="Label"
  placeholder="Placeholder"
  hasLoadMoreItemsButton="true"
  id="example-elvia-dropdown-loadmore"
></elvia-dropdown>`,

  codeNativeScript: `  // This code causes the "load more" button to be 
  // clickable two times before being removed
  const dropdown = document.getElementById('example-elvia-dropdown-loadmore');
  const items = [
    { value: 'Nord-Korea', label: 'Nord-Korea' },
    { value: 'Nord-Makedonia', label: 'Nord-Makedonia' },
    { value: 'Norge', label: 'Norge' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Russland', label: 'Russland' },
    { value: 'Sveits', label: 'Sveits' },
    { value: 'Sverige', label: 'Sverige' },
  ];
  dropdown.setProps({ items: items });
  let timesLoadedMoreItems = 0;
  dropdown.addEventListener('onLoadMoreItems', () => {
    dropdown.setProps({ isLoadingMoreItems: 'true' });
    setTimeout(() => {
      dropdown.setProps({ isLoadingMoreItems: 'false' });
      if (timesLoadedMoreItems === 0) {
        items.push({ value: 'Tyskland', label: 'Tyskland' });
        items.push({ value: 'Ungarn', label: 'Ungarn' });
        items.push({ value: 'USA', label: 'USA' });
        items.push({ value: 'Vatikanstaten', label: 'Vatikanstaten' });
      } else if (timesLoadedMoreItems === 1) {
        items.push({ value: 'Venezuela', label: 'Venezuela' });
        items.push({ value: 'Vietnam', label: 'Vietnam' });
        items.push({ value: 'Østerrike', label: 'Østerrike' });
        items.push({ value: 'Øst-Timor', label: 'Øst-Timor' });
      }
      dropdown.setProps({ items: items });
      timesLoadedMoreItems++;
      if (timesLoadedMoreItems > 1) {
        dropdown.setProps({ hasLoadMoreItemsButton: 'false' });
      }
    }, 2000);
  });
`,
};

export { dropdownLoadMoreItemsCode };
