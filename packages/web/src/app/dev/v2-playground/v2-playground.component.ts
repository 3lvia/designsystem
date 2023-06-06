import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { openElviaToast } from '@elvia/elvis-toast';
import { dropdownData } from './dropdown-data';

@Component({
  selector: 'app-v2-playground',
  templateUrl: './v2-playground.component.html',
  styleUrls: ['./v2-playground.component.scss'],
})
export class v2PlaygroundComponent {
  // Accordion
  accordionContent = 'Bacon ipsum dolor amet pork loin bacon jowl turkey.';
  accordionHtmlContent = `<div>HTML content<div>`;
  isOpen = false;

  // Breadcrumb
  breadcrumbsTestNoUrl = [{ text: 'Elvia.no' }, { text: 'Nettleie' }, { text: 'Elvias leveringsplikt' }];

  // Carousel
  carouselParagraph = `
  Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines.

  It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.
  `;

  // Chips
  deleteValue = 0;
  filteredValues = { 2021: false, 2022: true, 2023: true, 2024: true };
  filteredKeys = Object.keys(this.filteredValues) as unknown as Array<keyof typeof this.filteredValues>;
  deletableChipsList = [
    { value: 2023, color: 'red' },
    { value: 2025, color: 'red', isDisabled: true },
  ];
  choiceChipsList = [
    { value: 2025, color: 'purple' },
    { value: 2025, color: 'purple', isSelected: true },
  ];
  legendChipsList = [
    { value: 2024, color: 'blue' },
    { value: 2025, color: 'blue', isSelected: true },
    { value: 2025, color: 'blue', isLoading: true },
  ];

  // Context menu
  isContextMenuShowing = false;

  // Datepicker
  date = new Date(2022, 9, 10, 22, 42, 42, 42);
  minDate = new Date(2022, 9, 5);
  maxDate = new Date(2023, 9, 25);
  errorOptions = { hasErrorPlaceholder: false, isErrorState: true, text: 'Hello' };
  disableDate = (date: Date) => date.getDate() % 3 === 0;
  writeDate = (d: Date) => console.log('Retrieving in Angular: ', d);
  dateOnClose = () => console.log('Datepicker closed');
  dateOnOpen = () => console.log('Datepicker opened');
  dateOnReset = () => console.log('Datepicker was reset');
  changeISO = (value: string) => console.log('Change iso: ', value);

  // Datepicker range
  dateRangeDates = { start: new Date(2022, 9, 10), end: new Date(2022, 9, 20) };
  errorOptionsRange = {
    start: { hasErrorPlaceholder: false, text: 'hei' },
    end: { isErrorState: true, hasErrorPlaceholder: false },
  };
  labelOptions = { start: 'Start-dato', end: 'Sluttdato' };
  minDateRange = new Date(2022, 6, 26, 14, 0);
  maxDateRange = new Date(2022, 6, 30, 23, 0);
  disableDates = {
    start: (date: Date) => date.getDate() % 3 === 0,
    end: (date: Date) => date.getDate() % 7 === 0,
  };

  // Dropdown
  selectedDropdownItem = 'sverige';
  longDropdownList = dropdownData;
  dropdownItems = [
    {
      value: 0,
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
    {
      value: 1,
      label: 'Sverige',
      isDisabled: true,
      status: 'info',
      tooltip: 'Sweden is a country',
    },
    { value: 'danmark', label: 'Danmark' },
    {
      value: 'finland',
      label: 'Finland  med en veldig lang tekst som kommer til å overflowe',
      isDisabled: true,
    },
    { value: 'spania', label: 'Spania' },
    { value: 'tyskland', label: 'Tyskland' },
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
  isLoadingMoreItems = false;
  setLoading = () => {
    this.isLoadingMoreItems = true;
    setTimeout(() => (this.isLoadingMoreItems = false), 4000);
  };
  onDropdownSelect = (value: string | number) =>
    console.log(typeof value === 'number' ? value + value : value, typeof value);

  // Modal
  isModalShowing = false;
  isIllustrationModalShowing = false;
  isMultiPageModalShowing = false;

  // Pagination
  defaultPaginationValue = { start: 76, end: 100 };
  paginationDropdownItems = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
  ];
  dropdownSelectedItemIndex = 3;

  // Popover
  isPopoverShowing = false;
  isPopoverListShowing = false;
  isPopoverListHeadingShowing = false;
  isPopoverListIconsShowing = false;
  isPopoverLIstCheckedShowing = false;
  isPopoverShowing1 = false;

  // Progress linear
  progressValue = 0;
  progressError = false;
  indeterminate = false;

  // Radio filter
  radioFilterValues = [
    { label: 'All', value: 'all' },
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagged', value: 'flagged' },
  ];

  // Spotlight
  showSpotlight = false;
  toggleSpotlight = () => (this.showSpotlight = !this.showSpotlight);

  // Tabs
  items = [
    { label: 'Epler' },
    { label: 'Appelsin' },
    { label: 'Bananer' },
    { label: 'Druer' },
    { label: 'Kiwi', isDisabled: true },
  ];

  // Timepicker
  timepickerValue = new Date();

  // Toast
  showToast = () => {
    openElviaToast({
      title: 'First title',
      body: 'First body. This is a long one though. It should probably wrap over several lines so that we can check how that looks.',
      closable: true,
      duration: 4000,
    });
  };

  // Tooltip
  tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  customTooltipText = 'This is a custom text';
  onCustomTextHover = () => {
    setTimeout(() => (this.customTooltipText = 'That now changed into a much longer text'), 2500);
  };

  shuffleTooltipPosition = (): void => {
    if (this.tooltipPosition === 'top') {
      this.tooltipPosition = 'right';
    } else if (this.tooltipPosition === 'right') {
      this.tooltipPosition = 'bottom';
    } else if (this.tooltipPosition === 'bottom') {
      this.tooltipPosition = 'left';
    } else {
      this.tooltipPosition = 'top';
    }
  };

  logValue = (component: string, value: Event): void => {
    console.log(component, ': ', value);
  };
  log = (event: string): void => {
    console.log(event);
  };

  // Accordion
  onOpen = (): void => {
    this.isOpen = true;
    console.log('Trigger onOpen');
  };
  onClose = (): void => {
    this.isOpen = false;
    console.log('Trigger onClose');
  };
  // Chips
  handleOnChange = (event: { target: { value: string }; detail: { value: boolean } }): void => {
    console.log(`handleOnChange ${event.target.value}: ${event.detail.value}`);
    this.filteredValues = { ...this.filteredValues, [event.target.value]: event.detail.value };
  };
  changeChipStates = (): void => {
    this.filteredValues = Object.fromEntries(
      Object.entries(this.filteredValues).map(([key, value]) => [key, !value]),
    ) as typeof this.filteredValues;
  };
  handleOnDelete = (event: number): void => {
    this.deleteValue = event;
    const values = [...this.deletableChipsList];
    this.deletableChipsList = values.filter((value) => value.value !== event);
  };

  // Popover
  popoverOnOpen = (): void => {
    console.log('Popover opened');
  };
  popoverOnClose = (): void => {
    console.log('Popover closed');
  };

  sliderOnValueChange = (event: CustomEvent): void => {
    console.log('Slider value changed: ', event.detail.value);
  };

  constructor(private titleService: Title) {
    this.titleService.setTitle('DEV-playground | Elvia design system');
  }
}
