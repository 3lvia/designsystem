import { Component, Input, OnInit } from '@angular/core';
import { ExampleCodeService } from '../../../example-code.service';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit {
  @Input() componentData;
  @Input() codeReact;
  @Input() codeWebComponent;
  props = [];

  constructor(private codeService: ExampleCodeService) {}

  ngOnInit(): void {
    this.getComponentVariables();
  }

  getComponentVariables(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      Object.keys(this.componentData.attributes[attribute]).forEach((value) => {
        if (value === 'formType') {
          this.props.push(this.componentData.attributes[attribute]);
        }
      });
    });
  }

  changeCode(prop: Array<string>, label: string): void {
    console.log(prop);
    console.log(label);
    console.log(this.codeReact);
    console.log(this.codeWebComponent);
    this.codeService.UpdateCodeReact('helo');
  }
}
