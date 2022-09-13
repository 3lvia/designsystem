const dropdownLoadMoreItemsCode = {
  codeReact: `<Dropdown 
    items={[
      { value: 'Nord-Korea', label: 'Nord-Korea'},
      { value: 'Nord-Makedonia', label: 'Nord-Makedonia'},
      { value: 'Norge', label: 'Norge' },
      { value: 'Oman', label: 'Oman'},
      { value: 'Russland', label: 'Russland'},
    ]} 
    label={"Label"}
    placeholder={"Placeholder"}
    isLoadingMoreItems={isLoadingMoreItems}
    loadMoreItems={() => loadMoreDropdownItems()}
></Dropdown>
    `,
  codeAngular: `<elvia-dropdown
    [items]="[
        { value: 'Nord-Korea', label: 'Nord-Korea'},
        { value: 'Nord-Makedonia', label: 'Nord-Makedonia'},
        { value: 'Norge', label: 'Norge' },
        { value: 'Oman', label: 'Oman'},
        { value: 'Russland', label: 'Russland'},
    ]"
    [label]="'Label'"
    [placeholder]="'Placeholder'"
    [isLoadingMoreitems]="isLoadingMoreItems"
    (loadMoreItems)="loadMoreDropdownItems()"
></elvia-dropdown>
    `,
  codeVue: `<elvia-dropdown
    :items="[
        { value: 'Nord-Korea', label: 'Nord-Korea'},
        { value: 'Nord-Makedonia', label: 'Nord-Makedonia'},
        { value: 'Norge', label: 'Norge' },
        { value: 'Oman', label: 'Oman'},
        { value: 'Russland', label: 'Russland'},
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
    id="example-elvia-dropdown-loadmoreitems"
></elvia-dropdown>`,

  codeNativeScript: `const dropdown = document.getElementById('example-elvia-dropdown-loadmoreitems');
const items = [
    { value: 'Nord-Korea', label: 'Nord-Korea'},
    { value: 'Nord-Makedonia', label: 'Nord-Makedonia'},
    { value: 'Norge', label: 'Norge' },
    { value: 'Oman', label: 'Oman'},
    { value: 'Russland', label: 'Russland'},
    { value: 'Sveits', label: 'Sveits' },
    { value: 'Sverige', label: 'Sverige' },
];
dropdown.setProps({items: items});
dropdown.addEventListener('loadMoreItems', () => {
    dropdown.setProps({isLoadingMoreItems: 'true'});
    setTimeout(() => {
        dropdown.setProps({isLoadingMoreItems: 'false'});
        items.push({ value: 'Tyskland', label: 'Tyskland' });
        items.push({ value: 'Ungarn', label: 'Ungarn' });
        items.push({ value: 'USA', label: 'USA' });
        items.push({ value: 'Vatikanstaten', label: 'Vatikanstaten' });
        items.push({ value: 'Venezuela', label: 'Venezuela' });
        dropdown.setProps({items: items});
    }, 2000);
});
    `,
};

export { dropdownLoadMoreItemsCode };
