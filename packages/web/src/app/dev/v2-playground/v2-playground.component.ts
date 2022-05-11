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

  // Breadcrumb
  breadcrumbsTestNoUrl = [{ title: 'Elvia.no' }, { title: 'Nettleie' }, { title: 'Elvias leveringsplikt' }];

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
  date = new Date(2021, 4, 20);

  // Dropdown
  dropdownDefOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];
  dropdownOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
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

  logValue = (component: string, value: Event): void => {
    console.log(component, ': ', value);
  };

  // Chips
  handleOnChange = (event: { value: string; isSelected: boolean }): void => {
    this.filteredValues = { ...this.filteredValues, [event.value]: event.isSelected };
  };
  handleOnDelete = (event: number): void => {
    this.deleteValue = event;
    const values = [...this.deletableChipsList];
    this.deletableChipsList = values.filter((value) => value.value !== event);
  };
}
