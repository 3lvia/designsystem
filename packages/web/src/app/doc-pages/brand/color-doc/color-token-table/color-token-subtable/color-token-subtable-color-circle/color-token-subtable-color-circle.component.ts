import { NgClass } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';

type ColorType = 'default' | 'black-white' | 'dark-black-white' | 'signal' | 'dark-signal';

@Component({
  selector: 'app-color-token-subtable-color-circle',
  templateUrl: './color-token-subtable-color-circle.component.html',
  styleUrls: ['./color-token-subtable-color-circle.component.scss'],
  imports: [NgClass],
})
export class ColorTokenSubtableColorCircleComponent implements OnInit {
  readonly hex = input<string>();

  colorType: ColorType = 'default';

  ngOnInit(): void {
    switch (this.hex()) {
      case 'black/white':
        this.colorType = 'black-white';
        break;
      case 'dark-black/dark-white':
        this.colorType = 'dark-black-white';
        break;
      case 'signal':
        this.colorType = 'signal';
        break;
      case 'dark-signal':
        this.colorType = 'dark-signal';
        break;
      default:
        this.colorType = 'default';
        break;
    }
  }
}
