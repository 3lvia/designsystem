import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CegControlManager } from '../cegControlManager';
import { CegCustomText } from '../controlType';

@Component({
  selector: 'app-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.scss'],
})
export class CustomTextComponent implements OnInit {
  @Input() controlManager: CegControlManager;
  @Input() customLabel = '';
  @Output() propChange = new EventEmitter<{ propName: string; value: string }>();
  customText: Observable<CegCustomText | undefined>;
  popoverIsOpen = false;

  ngOnInit() {
    this.customText = this.controlManager.getCurrentCustomTexts();
  }

  getInputId(key: string): string {
    return `ceg-custom-text-${key}`;
  }

  onChange(key: string, value: string) {
    this.propChange.emit({ propName: key, value: value });
  }

  resetText() {
    this.controlManager.resetCustomTexts();
  }
}
