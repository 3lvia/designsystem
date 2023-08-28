import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  textColorsDefault,
  textColorsState,
  backgroundColorsDefault,
  backgroundColorsElement,
  backgroundColorsOverlay,
  backgroundColorsStates,
  borderColors,
  borderColorsStates,
  signalColors,
  dataColors,
  iconColors,
  assortedColors,
} from './colors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScrollColorsService } from '../scroll-colors.service';

@Component({
  selector: 'app-color-token-table',
  templateUrl: './color-token-table.component.html',
  styleUrls: ['./color-token-table.component.scss'],
})
export class ColorTokenTableComponent {
  @ViewChild('colorTokenTable') colorTokenTable: ElementRef<HTMLDivElement>;

  textColorsDefault = textColorsDefault;
  textColorsState = textColorsState;
  backgroundColorsDefault = backgroundColorsDefault;
  backgroundColorsElement = backgroundColorsElement;
  backgroundColorsOverlay = backgroundColorsOverlay;
  backgroundColorsState = backgroundColorsStates;
  borderColors = borderColors;
  borderColorsStates = borderColorsStates;
  signalColors = signalColors;
  dataColors = dataColors;
  assortedColors = assortedColors;
  iconColors = iconColors;

  constructor(private scrollService: ScrollColorsService) {
    this.scrollService.onScroll.pipe(takeUntilDestroyed()).subscribe(() => {
      this.colorTokenTable.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
