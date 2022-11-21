import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ElviaDropdownItem } from '@elvia/elvis-dropdown';
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
  filteredKeys = Object.keys(this.filteredValues);
  deletableChipsList = [
    { value: 2022, color: 'green' },
    { value: 2023, color: 'red' },
    { value: 2024, color: 'blue' },
    { value: 2025, color: 'purple', isDisabled: true },
  ];

  // Datepicker
  date = new Date(2022, 9, 10, 22, 42, 42, 42);
  minDate = new Date(2022, 9, 5);
  maxDate = new Date(2023, 9, 25);
  disableDate = (date: Date) => date.getDate() % 3 === 0;
  writeDate = (d: Date) => console.log('Retrieving in Angular: ', d);
  dateOnClose = () => console.log('Datepicker closed');
  dateOnOpen = () => console.log('Datepicker opened');
  dateOnReset = () => console.log('Datepicker was reset');
  changeISO = (value: string) => console.log('Change iso: ', value);

  // Datepicker range
  dateRangeDates = { start: new Date(2022, 9, 10), end: new Date(2022, 9, 20) };
  labelOptions = { start: 'Start-dato', end: 'Sluttdato' };
  disableDates = {
    start: (date: Date) => date.getDate() % 3 === 0,
    end: (date: Date) => date.getDate() % 7 === 0,
  };

  // Dropdown
  selectedDropdownItem = 'sverige';
  longDropdownList = dropdownData;
  dropdownItems: ElviaDropdownItem[] = [
    {
      value: 'norge',
      label: 'Norge med en veldig lang tekst som kommer til å overflowe',
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
      value: 'sverige',
      label: 'Sverige',
      status: 'info',
      tooltip: 'Sweden is a country',
    },
    { value: 'danmark', label: 'Danmark' },
    { value: 'finland', label: 'Finland' },
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

  // Modal
  isModalShowing = false;

  // Pagination
  defaultPaginationValue = { start: 1, end: 10 };

  // Popover
  isPopoverShowing = false;
  isPopoverListShowing = false;
  isPopoverListHeadingShowing = false;
  isPopoverListIconsShowing = false;
  isPopoverLIstCheckedShowing = false;
  isPopoverShowing1 = false;

  // Progress linear
  progressValue = 0;
  progressError;
  indeterminate;

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
    Object.keys(this.filteredValues).forEach((key) => {
      this.filteredValues[key] = !this.filteredValues[key];
    });
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

  constructor(private titleService: Title) {
    this.titleService.setTitle('DEV-playground | Elvia design system');
  }
}
