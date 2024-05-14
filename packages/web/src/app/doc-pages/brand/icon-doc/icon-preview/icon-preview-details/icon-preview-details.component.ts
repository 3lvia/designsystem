import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, input, model } from '@angular/core';

import { createPngBlob, createSvgBlobFromElement } from '../../../imageDownloadUtils';
import { Icon } from '../utils';
import { Theme } from 'src/app/core/services/theme.service';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-icon-preview-details',
  standalone: true,
  imports: [NgClass, CopyComponent],
  templateUrl: './icon-preview-details.component.html',
  styleUrl: './icon-preview-details.component.scss',
})
export class IconPreviewDetailsComponent {
  private elementRef = inject(ElementRef);

  selectedIcon = model.required<Icon | null>();
  theme = input.required<Theme>();

  downloadImage = async (format: 'svg' | 'png') => {
    const svgElement = this.getIconElement();
    if (!svgElement) {
      throw new Error('No SVG element found');
    }

    const a = document.createElement('a');
    a.href = await (format === 'svg'
      ? createSvgBlobFromElement(svgElement, {
          tokens: 'icon',
          theme: this.theme(),
        })
      : createPngBlob(svgElement, {
          tokens: 'icon',
          theme: this.theme(),
        }));
    a.download = this.imageFileName(format);
    a.click();
  };

  private getIconElement() {
    const icon = this.elementRef.nativeElement.querySelector(
      `.e-icon.e-icon--${this.selectedIcon()?.title}`,
    ) as HTMLElement;
    return icon?.querySelector('svg');
  }

  private imageFileName(format: 'svg' | 'png') {
    return `${this.selectedIcon()?.title}_${this.theme()}.${format}`;
  }
}
