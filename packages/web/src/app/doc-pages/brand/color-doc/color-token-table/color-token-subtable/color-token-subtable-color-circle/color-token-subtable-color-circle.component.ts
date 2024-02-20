import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

type ColorType = 'default' | 'black-white' | 'dark-black-white' | 'signal' | 'dark-signal';

@Component({
    selector: 'app-color-token-subtable-color-circle',
    templateUrl: './color-token-subtable-color-circle.component.html',
    styleUrls: ['./color-token-subtable-color-circle.component.scss'],
    standalone: true,
    imports: [NgIf, NgClass],
})
export class ColorTokenSubtableColorCircleComponent implements OnInit {
  @Input() hex: string;

  colorType: ColorType = 'default';

  ngOnInit(): void {
    switch (this.hex) {
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
