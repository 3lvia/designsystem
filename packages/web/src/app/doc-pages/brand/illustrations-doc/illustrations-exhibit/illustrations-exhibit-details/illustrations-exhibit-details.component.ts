import { Component, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';
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
    a.href = this.createSvgBlobFromElement();
    a.download = this.imageFileName('svg');
    a.click();
  };

  downloadPng = async () => {
    const a = document.createElement('a');
    a.href = await this.createPngBlob();
    a.download = this.imageFileName('png');
    a.click();
  };

  private createSvgBlobFromElement = () => {
    const selectedIllustration = this.selectedIllustration();
    if (!selectedIllustration) {
      return '';
    }

    const illustrationElement = (this.elementRef.nativeElement as HTMLElement).querySelector(
      `elvia-illustrations-${selectedIllustration}`,
    );
    const svgElement = illustrationElement?.shadowRoot?.querySelector('svg');
    const styleElement = illustrationElement?.shadowRoot?.querySelector('style');
    if (!styleElement || !svgElement) {
      console.error('No SVG or style element found');
      return '';
    }

    const newSvgElement = svgElement.cloneNode(true) as SVGElement;
    newSvgElement.insertBefore(styleElement.cloneNode(true), newSvgElement.firstChild);
    newSvgElement.classList.add(this.colorValue() || '');

    const svgString = new XMLSerializer().serializeToString(newSvgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  };

  private createPngBlob = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const svgBlobUrl = this.createSvgBlobFromElement();

      if (!svgBlobUrl) {
        console.error('No SVG blob url found');
        reject(new Error('No SVG blob url found'));
      }

      const img = new Image();
      img.src = svgBlobUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Could not get 2d context');
          reject(new Error('Could not get 2d context'));
          return;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('Could not create blob');
            reject(new Error('Could not create blob'));
            return;
          }

          resolve(URL.createObjectURL(blob));
        });
      };
    });
  };
}
