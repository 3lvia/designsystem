import { Component, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';
import { createPngBlob, createSvgBlobFromElement } from './imageDownloadUtils';
import { LocalizationService } from 'src/app/core/services/localization.service';
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

  imageFileName = (format: 'svg' | 'png') => {
    if (this.colorValue() === 'grey' || !this.colorValue()) {
      return `${this.selectedIllustration()}.${format}`;
    }
    return `${this.selectedIllustration()}_${this.colorValue()}.${format}`;
  };

  downloadSvg = () => {
    const a = document.createElement('a');
    a.href = createSvgBlobFromElement(this.getIllustrationElement(), this.colorValue());
    a.download = this.imageFileName('svg');
    a.click();
  };

  downloadPng = async () => {
    const a = document.createElement('a');
    a.href = await createPngBlob(this.getIllustrationElement(), this.colorValue());
    a.download = this.imageFileName('png');
    a.click();
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
