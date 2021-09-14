import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-v2-playground',
  templateUrl: './v2-playground.component.html',
  styleUrls: ['./v2-playground.component.scss'],
})
export class v2PlaygroundComponent implements OnInit {
  @ViewChild('checkbox1', { static: true }) checkbox: any;
  checkBoxVal = true;
  checkBoxVal2 = true;
  progressValue = 0;
  counterValue = 2;
  description = '';
  progressError;
  indeterminate;
  isFullWidth = false;
  isModalShowing = false;
  date1 = new Date(2021, 4, 20);
  isPopoverShowing = false;

  accordionContent = `
    Bacon ipsum dolor amet pork loin bacon jowl turkey. Biltong sausage swine, shankle venison hamburger alcatra spare ribs bacon ham ribeye strip steak. Swine capicola picanha kevin drumstick. Chuck landjaeger pastrami, cow shoulder boudin short loin leberkas t-bone turkey prosciutto jowl. Turkey tail tongue cow shankle chicken tri-tip swine. Prosciutto pig ball tip kielbasa hamburger picanha pork chop tongue chicken shankle short loin filet mignon. T-bone shankle capicola, shoulder hamburger pancetta cupim chuck meatloaf turducken porchetta rump sausage strip steak ribeye.
  `;

  accordionHtmlContent = `
  <div>
    <h3>Testheader</h3>
    <p>Some paragraph with some important information</p>
    <button>Button</button>
  <div>
  `;

  carouselParagraph = `
  Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines.

  It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.
  `;

  carouselValue = 0;

  deleteValue = 0;

  filteredValues = { 2021: false, 2022: true, 2023: true, 2024: true };
  filteredKeys = Object.keys(this.filteredValues);

  deletableChipsList = [
    { value: 2022, color: 'green' },
    { value: 2023, color: 'red' },
    { value: 2024, color: 'blue' },
    { value: 2025, color: 'purple', disabled: true },
  ];

  elements = [
    {
      title: 'Dette er nytt',
      element: this.carouselParagraph,
    },
    {
      title: 'Hei til ny tariff!',
      element: this.carouselParagraph,
    },
    {
      title: 'Strømbruddsvarsel',
      element: this.carouselParagraph,
    },
    {
      element: this.carouselParagraph,
    },
  ];

  items = [
    { label: 'Epler' },
    { label: 'Appelsin' },
    { label: 'Bananer' },
    { label: 'Druer' },
    { label: 'Kiwi', isDisabled: true },
  ];
  value = 2;
  date = null;

  isCompact = true;
  isMulti = true;
  isDisabled = true;

  dropdownValue = undefined;

  defOptions = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
  ];

  exampleOptions = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
    },
  ];

  breadcrumbsTest = [
    {
      url: 'https://elvia.no',
      title: 'Elvia.no',
    },
    {
      url: 'https://www.elvia.no/nettleie',
      title: 'Nettleie',
    },
    {
      url: 'https://www.elvia.no/nettleie/elvias-leveringsplikt',
      title: 'Elvias leveringsplikt',
    },
  ];

  nativeJSApproach(): void {
    // Non-angular approach, not necessary when using angular:
    /*this.checkbox.nativeElement.addEventListener('checkedOnChange', (event: any) => {
      this.checkBoxVal2 = event.detail.checked;
    });
    this.checkbox.nativeElement.setProps({ checked: this.checkBoxVal2 });
    // If you need to get data at any other time: this.checkbox.nativeElement.getProps();*/
  }

  ngOnInit(): void {
    this.nativeJSApproach();
  }

  consoleLogDropdownValue = (): void => {
    console.log(this.dropdownValue);
  };

  closeCallback = (): void => {
    console.log('Updated: closecallback');
    this.isModalShowing = !this.isModalShowing;
  };

  updatePopoverVariable = (newValue: boolean): void => {
    console.log('Updated: closecallback ', newValue);
    this.isPopoverShowing = newValue;
  };

  updatedVisibility = (event: any): void => {
    console.log('Updated - visibility: ' + event);
  };

  handleOnChange = (event: { value: string; isSelected: boolean }): void => {
    this.filteredValues = { ...this.filteredValues, [event.value]: event.isSelected };
  };

  handleOnDelete = (event: number): void => {
    this.deleteValue = event;
    const values = [...this.deletableChipsList];
    this.deletableChipsList = values.filter((value) => value.value !== event);
  };
}
