import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { createPngBlobFromElement, createSvgBlobFromElement } from '../../../imageDownloadUtils';
import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-illustrations-exhibit-details',
  imports: [CopyComponent, IllustrationsGeneratorComponent],
  templateUrl: './illustrations-exhibit-details.component.html',
  styleUrl: './illustrations-exhibit-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IllustrationsExhibitDetailsComponent {
  private elementRef = inject(ElementRef);

  private illustrationExhibitService = inject(IllustrationsExhibitService);
  selectedIllustration = toSignal(this.illustrationExhibitService.selectedIllustration);
  colorValue = toSignal(this.illustrationExhibitService.colorValue);
  locale = toSignal(inject(LocalizationService).listenLocalization());
  private theme = toSignal(this.illustrationExhibitService.theme);

  get importString() {
    return `@elvia/elvis-illustrations/${this.selectedIllustration()}`;
  }
  get importStatement() {
    return `import '@elvia/elvis-illustrations/${this.selectedIllustration()}';`;
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
    const illustrationElement = this.getIllustrationElement();
    const svgElement = illustrationElement.shadowRoot?.querySelector('svg');
    if (!svgElement) {
      throw new Error('No SVG element found');
    }
    const styleElement = illustrationElement.shadowRoot?.querySelector('style');

    const a = document.createElement('a');
    a.href = await (format === 'svg'
      ? createSvgBlobFromElement(svgElement, {
          styleElement: styleElement,
        })
      : createPngBlobFromElement(svgElement, {
          styleElement: styleElement,
        }));
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
