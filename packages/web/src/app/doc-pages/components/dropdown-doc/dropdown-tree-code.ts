const dropdownTreeCode = {
  codeReact: `<Dropdown 
    items={[
      {
        value: 'norge',
        label: 'Norge',
        children: [
          { label: 'Oslo', value: 'oslo' },
          {
            label: 'Bergen',
            value: 'bergen',
            children: [
              { label: 'Arna', value: 'arna' },
              { label: 'Bergenhus', value: 'bergenhus' },
              { label: 'Fana', value: 'fana' },
              { label: 'Fyllingsdalen', value: 'fyllingsdalen' },
              { label: 'Laksevåg', value: 'Laksevåg' },
            ],
          },
          { label: 'Trondheim', value: 'trondheim' },
          { label: 'Stavanger', value: 'stavanger' },
          { label: 'Kristiansand', value: 'kristiansand' },
        ],
      },
      { value: 'sverige', label: 'Sverige' },
      { value: 'danmark', label: 'Danmark' },
      {
        value: 'england',
        label: 'England',
        children: [
          { value: 'london', label: 'London', icon: 'adjust' },
          { value: 'manchester', label: 'Manchester', icon: 'addCircle' },
          { value: 'birmingham', label: 'Birmingham', icon: 'search' },
        ],
      },
    ]} 
    value="birmingham"
    label="Label"
    valueOnChange={(event) => updateSelectedList(event)}
  ></Dropdown>
  `,
  codeAngular: `<elvia-dropdown
    [items]="[
      {
        value: 'norge',
        label: 'Norge',
        children: [
          { label: 'Oslo', value: 'oslo' },
          {
            label: 'Bergen',
            value: 'bergen',
            children: [
              { label: 'Arna', value: 'arna' },
              { label: 'Bergenhus', value: 'bergenhus' },
              { label: 'Fana', value: 'fana' },
              { label: 'Fyllingsdalen', value: 'fyllingsdalen' },
              { label: 'Laksevåg', value: 'Laksevåg' },
            ],
          },
          { label: 'Trondheim', value: 'trondheim' },
          { label: 'Stavanger', value: 'stavanger' },
          { label: 'Kristiansand', value: 'kristiansand' },
        ],
      },
      { value: 'sverige', label: 'Sverige' },
      { value: 'danmark', label: 'Danmark' },
      {
        value: 'england',
        label: 'England',
        children: [
          { value: 'london', label: 'London', icon: 'adjust' },
          { value: 'manchester', label: 'Manchester', icon: 'addCircle' },
          { value: 'birmingham', label: 'Birmingham', icon: 'search' },
        ],
      },
    ]"
    value="birmingham"
    label="Label"
    (valueOnChange)="updateSelectedList($event.detail.value)"
  ></elvia-dropdown>
  `,
  codeVue: `<elvia-dropdown
    :items="[
      {
        value: 'norge',
        label: 'Norge',
        children: [
          { label: 'Oslo', value: 'oslo' },
          {
            label: 'Bergen',
            value: 'bergen',
            children: [
              { label: 'Arna', value: 'arna' },
              { label: 'Bergenhus', value: 'bergenhus' },
              { label: 'Fana', value: 'fana' },
              { label: 'Fyllingsdalen', value: 'fyllingsdalen' },
              { label: 'Laksevåg', value: 'Laksevåg' },
            ],
          },
          { label: 'Trondheim', value: 'trondheim' },
          { label: 'Stavanger', value: 'stavanger' },
          { label: 'Kristiansand', value: 'kristiansand' },
        ],
      },
      { value: 'sverige', label: 'Sverige' },
      { value: 'danmark', label: 'Danmark' },
      {
        value: 'england',
        label: 'England',
        children: [
          { value: 'london', label: 'London', icon: 'adjust' },
          { value: 'manchester', label: 'Manchester', icon: 'addCircle' },
          { value: 'birmingham', label: 'Birmingham', icon: 'search' },
        ],
      },
    ]"
    value="birmingham"
    label="Label"
    @value-on-change="updateSelectedList($event.detail.value)"
  ></elvia-dropdown>
  `,
  codeNativeHTML: `<elvia-dropdown
    id="example-elvia-dropdown-tree"
  ></elvia-dropdown>`,

  codeNativeScript: `  const dropdown = document.getElementById('example-elvia-dropdown-tree');

    const items = [
      {
        value: 'norge',
        label: 'Norge',
        children: [
          { label: 'Oslo', value: 'oslo' },
          {
            label: 'Bergen',
            value: 'bergen',
            children: [
              { label: 'Arna', value: 'arna' },
              { label: 'Bergenhus', value: 'bergenhus' },
              { label: 'Fana', value: 'fana' },
              { label: 'Fyllingsdalen', value: 'fyllingsdalen' },
              { label: 'Laksevåg', value: 'Laksevåg' },
            ],
          },
          { label: 'Trondheim', value: 'trondheim' },
          { label: 'Stavanger', value: 'stavanger' },
          { label: 'Kristiansand', value: 'kristiansand' },
        ],
      },
      { value: 'sverige', label: 'Sverige' },
      { value: 'danmark', label: 'Danmark' },
      {
        value: 'england',
        label: 'England',
        children: [
          { value: 'london', label: 'London', icon: 'adjust' },
          { value: 'manchester', label: 'Manchester', icon: 'addCircle' },
          { value: 'birmingham', label: 'Birmingham', icon: 'search' },
        ],
      },
    ];

    dropdown.setProps({label: 'Label' });
    dropdown.setProps({items: items});
    dropdown.setProps({value: items[1].value});
  `,
};

export { dropdownTreeCode };
