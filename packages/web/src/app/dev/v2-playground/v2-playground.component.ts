import { Component } from '@angular/core';

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
  minDate = new Date(2022, 11, 25);
  maxDate = new Date(2023, 9, 25);
  disableDate = (date: Date) => date.getDate() % 3 === 0;
  writeDate = (d: Date) => console.log('Retrieving in Angular: ', d);

  // Dropdown
  dropdownDefOptions = [{ value: '2', label: 'Option 2' }];
  dropdownOptions = [
    {
      value: '1',
      label: 'Option 1',
      status: 'informative',
      tooltip: 'Dette er tooltip content\nDen har også newline content\nNew line\nNew',
    },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', isDisabled: 'true' },
  ];

  // Modal
  isModalShowing = false;

  // Pagination
  defaultPaginationValue = { start: 1, end: 10 };

  // Popover
  isPopoverShowing = false;

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
    this.filteredValues = { ...this.filteredValues, [event.target.value]: event.detail.value };
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
}
