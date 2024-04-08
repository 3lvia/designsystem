import { Component, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';
import { createPngBlob, createSvgBlobFromElement } from './imageDownloadUtils';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-illustrations-exhibit-details',
  standalone: true,
  imports: [CopyComponent, IllustrationsGeneratorComponent],
  templateUrl: './illustrations-exhibit-details.component.html',
  styleUrl: './illustrations-exhibit-details.component.scss',
})
export class IllustrationsExhibitDetailsComponent {
  private elementRef = inject(ElementRef);

  private illustrationExhibitService = inject(IllustrationsExhibitService);
  selectedIllustration = toSignal(this.illustrationExhibitService.selectedIllustration);
  colorValue = toSignal(this.illustrationExhibitService.colorValue);
  locale = toSignal(inject(LocalizationService).listenLocalization());
  private theme = toSignal(inject(ThemeService).listenTheme());

  get importString() {
    return `@elvia/illustrations/${this.selectedIllustration()}`;
  }
  get importStatement() {
    return `import '@elvia/illustrations/${this.selectedIllustration()}';`;
  }
  get colorString() {
    const color = this.colorValue();
    return !color || color === 'grey' ? '' : ` color="${color}"`;
  }
  get usageString() {
    return `<elvia-illustrations-${this.selectedIllustration()}${this.colorString} />`;
  }
  get usageCopyString() {
    return `<elvia-illustrations-${this.selectedIllustration()}${this.colorString}></elvia-illustrations-${this.selectedIllustration()}>`;
  }

  clearSelection() {
    this.illustrationExhibitService.setSelectedIllustration(null);
  }

  downloadImage = async (format: 'svg' | 'png') => {
    const a = document.createElement('a');
    a.href = await (format === 'svg'
      ? createSvgBlobFromElement(this.getIllustrationElement(), this.colorValue(), this.theme())
      : createPngBlob(this.getIllustrationElement(), this.colorValue(), this.theme()));
    a.download = this.imageFileName(format);
    a.click();
  };

  private imageFileName = (format: 'svg' | 'png') => {
    const theme = this.theme() ?? 'light';
    if (this.colorValue() === 'grey' || !this.colorValue()) {
      return `${this.selectedIllustration()}_${theme}.${format}`;
    }
    return `${this.selectedIllustration()}_${theme}_${this.colorValue()}.${format}`;
  };

  private getIllustrationElement = () => {
    const element = (this.elementRef.nativeElement as HTMLElement).querySelector(
      `elvia-illustrations-${this.selectedIllustration()}`,
    );
    if (!element) {
      throw new Error('No illustration element found');
    }
    return element;
  };
}
