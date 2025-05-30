import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import type { DropdownItem } from '@elvia/elvis-dropdown';
import { openElviaToast } from '@elvia/elvis-toast';

import { dropdownData } from './dropdown-data';

interface StepState {
  heading: string;
  isError: boolean;
  isCompleted: boolean;
}
interface StepStates {
  [step: number]: Partial<StepState>;
}
@Component({
  selector: 'app-v2-playground',
  templateUrl: './v2-playground.component.html',
  styleUrls: ['./v2-playground.component.scss'],
  imports: [NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class v2PlaygroundComponent {
  endMinDate = new Date(2023, 9, 10);
  endTimeValue: Date | null = new Date(2023, 9, 10);
  isHidden = false;

  testDate = () => {
    this.endMinDate = new Date(2023, 9, 12);
    this.endTimeValue = null;
  };

  resetDate = () => {
    this.endMinDate = new Date(2023, 9, 10);
    this.endTimeValue = new Date(2023, 9, 10);
  };

  // Accordion
  accordionContent = 'Bacon ipsum dolor amet pork loin bacon jowl turkey.';
  accordionHtmlContent = `<div>HTML content<div>`;
  isOpen = false;

  //autocomplete
  autocompleteItems = [
    { value: 'Appelsin', label: 'Appelsin' },
    { value: 'Banan', label: 'Banan' },
    { value: 'Eple', label: 'Eple' },
    { value: 'Jordbær', label: 'Jordbær' },
    { value: 'Pære', label: 'Pære' },
    { value: 'Vannmelon', label: 'Vannmelon' },
    { value: 'Druer', label: 'Druer' },
  ];

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
  maxDateRange = new Date(2022, 6, 30, 20, 0);
  disableDates = {
    start: (date: Date) => date.getDate() % 3 === 0,
    end: (date: Date) => date.getDate() % 7 === 0,
  };

  // Dropdown
  selectedDropdownItem = 'sverige';
  longDropdownList = dropdownData;
  dropdownItems: DropdownItem[] = [
    { value: null, label: '- Posisjon -' },
    {
      value: 'norge',
      label: 'Norge',
      // children: [
      //   { label: 'Oslo', value: 'oslo' },
      //   {
      //     label: 'Bergen',
      //     value: 'bergen',
      //     children: [
      //       { label: 'Arna', value: 'arna' },
      //       { label: 'Bergenhus', value: 'bergenhus' },
      //       { label: 'Fana', value: 'fana' },
      //       { label: 'Fyllingsdalen', value: 'fyllingsdalen' },
      //       { label: 'Laksevåg', value: 'Laksevåg' },
      //     ],
      //   },
      //   { label: 'Trondheim', value: 'trondheim' },
      //   { label: 'Stavanger', value: 'stavanger' },
      //   { label: 'Kristiansand', value: 'kristiansand' },
      // ],
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
      label:
        'Finland  med en veldig lang tekst som kommer til å overflowe overflowe overflowe overflowe som kommer til å overflowe overflowe overflowe overflowe som kommer til å overflowe overflowe overflowe overflowe',
    },
    { value: 'spania', label: 'Spania' },
    { value: 'tyskland', label: 'Tyskland' },
    {
      value: 'england',
      label: 'England',
      // children: [
      //   { value: 'london', label: 'London' },
      //   { value: 'manchester', label: 'Manchester' },
      //   { value: 'birmingham', label: 'Birmingham' },
      // ],
    },
  ];

  dropdownImageItems = [
    {
      value: 'mats',
      label: 'Mats',
      icon: '<img src="assets/dropdown/images/mats.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'peder',
      label: 'Peder',
      icon: '<img src="assets/dropdown/images/peder.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'katrine',
      label: 'Katrine',
      icon: '<img src="assets/dropdown/images/katrine.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'sofie',
      label: 'Sofie',
      icon: '<img src="assets/dropdown/images/sofie.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'trine',
      label: 'Trine Marie',
      icon: '<img src="assets/dropdown/images/trine.png" class="e-dropdown__image" width="32" height="32">',
    },
  ];

  labelTransformation = (val: string): string => {
    const label = this.dropdownItems.find((item) => item.value === val)?.label as string;
    return `${label.substring(0, 6)}${label.length > 6 ? '...' : ''}`;
  };

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
  modalContentToggle = true;

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

  popoverOnOpen = () => {
    this.isPopoverShowing = true;
    console.log('popover open');
  };
  popoverOnClose = () => {
    this.isPopoverShowing = false;
    console.log('popover close');
  };

  // Progress linear
  progressValue = 0;
  progressError = false;
  indeterminate = false;

  // Radio filter
  radioFilterValues = [
    { label: 'All', value: 'all' },
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
    {
      label: '<e-icon name="bookmarkFilled" size="xs"></e-icon>Flagged',
      value: 'flagged',
    },
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

  selectedTabIndex = 1;

  tabsValueOnChange(value: number): void {
    console.log('New tab index:', value);
    this.selectedTabIndex = value;
  }

  stepperStates: StepStates = {
    '1': { isCompleted: true, heading: 'Title #1' },
    '2': { heading: 'Title #2' },
    '3': { isError: true, heading: 'Title #3' },
    '4': { heading: 'Title #4' },
    '5': { heading: 'Title #5' },
    '6': { heading: 'Title #6' },
    '7': { heading: 'Title #7' },
    '8': { heading: 'Title #8' },
  };
  toggleState = () =>
    (this.stepperStates = { ...this.stepperStates, '2': { isCompleted: true, heading: 'Title #2' } });

  // Timepicker
  timepickerValue = new Date();
  timepickerMax = new Date(2023, 9, 16, 17, 0);
  timepickerMin = new Date(2023, 9, 16, 9, 0);

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

  sliderOnValueChange = (event: CustomEvent): void => {
    console.log('Slider value changed: ', event.detail.value);
  };
}
