import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CegCustomText, ControlConfiguration } from '../controlType';

@Component({
  selector: 'app-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.scss'],
})
export class CustomTextComponent implements OnInit {
  @Input() configuration: BehaviorSubject<ControlConfiguration>;
  @Input() customLabel = '';
  @Output() inputChange = new EventEmitter<{ key: string; value: string }>();
  customText: Observable<CegCustomText>;
  initialTexts: CegCustomText;
  popoverIsOpen = false;

  ngOnInit() {
    this.initialTexts = JSON.parse(JSON.stringify(this.configuration.value.customText));
    this.customText = this.configuration.pipe(map((config) => config.customText));
  }

  getInputId(key: string): string {
    return `ceg-custom-text-${key}`;
  }

  onChange(key: string, value: string) {
    this.inputChange.emit({ key: key, value: value });
  }

  resetText() {
    const existingConfig = this.configuration.value;
    this.configuration.next({ ...existingConfig, customText: this.initialTexts });
  }
}
