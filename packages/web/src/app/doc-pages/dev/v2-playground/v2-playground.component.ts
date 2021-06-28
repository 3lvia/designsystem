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
  date1 = new Date(2021, 4, 20);

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
  `

carouselElement = `
Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two.
`

carouselImage = `
<img src="https://images.unsplash.com/photo-1533591917057-a0b77b40de75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="pride" width="300" height="300"/>
`

carouselValue = 0;

elements  = [
    {
      title: 'Dette er nytt',
      element: this.carouselParagraph},
    {
      title: 'Hei til ny tariff!',
      element: 'Body text comes here and can go over several lines. It looks like this and when it is two.',
    },
    {
      title: 'Strømbruddsvarsel',
      element: this.carouselElement,
    },
    {
      element: this.carouselImage
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

  consoleLogDropdownValue = () => {
    console.log(this.dropdownValue);
  };
}
