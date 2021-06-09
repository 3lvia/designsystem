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
}
