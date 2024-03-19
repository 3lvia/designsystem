import { Component, ElementRef, effect, inject } from '@angular/core';
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

  svgBlobUrl = '';
  pngBlobUrl = '';

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

  constructor() {
    effect(() => {
      this.svgBlobUrl = this.createSvgBlobFromElement();
      this.createPngBlobFromSvg();
    });
  }

  imageFileName = (format: 'svg' | 'png') => {
    if (this.colorValue() === 'grey' || !this.colorValue()) {
      return `${this.selectedIllustration()}.${format}`;
    }
    return `${this.selectedIllustration()}_${this.colorValue()}.${format}`;
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
    newSvgElement.insertBefore(styleElement?.cloneNode(true) as Node, newSvgElement.firstChild);
    newSvgElement.classList.add(this.colorValue() || '');

    const svgString = new XMLSerializer().serializeToString(newSvgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  };

  private createPngBlobFromSvg = () => {
    const img = new Image();
    img.src = this.svgBlobUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2d context');
        return;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Could not create blob');
          return;
        }
        this.pngBlobUrl = URL.createObjectURL(blob);
      });
    };
  };
}
