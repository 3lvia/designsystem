import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, computed, inject, input, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { createPngBlobFromElement, createSvgBlobFromElement } from '../../../imageDownloadUtils';
import { IconGeneratorComponent } from '../../icon-generator/icon-generator.component';
import { Icon, kebabCaseToCamelCase } from '../utils';
import { Theme } from 'src/app/core/services/theme.service';
import { PreferredLanguageService } from 'src/app/shared/component-documentation/preferredLanguage.service';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-icon-preview-details',
  standalone: true,
  imports: [NgClass, CopyComponent, IconGeneratorComponent],
  templateUrl: './icon-preview-details.component.html',
  styleUrl: './icon-preview-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconPreviewDetailsComponent {
  private elementRef = inject(ElementRef);
  preferredLanguage = toSignal(inject(PreferredLanguageService).listenLanguage(['angular', 'react', 'vue']));

  selectedIcon = model.required<Icon | null>();
  theme = input.required<Theme>();

  transformedName = computed(() => kebabCaseToCamelCase(this.selectedIcon()?.title ?? ''));

  downloadImage = async (format: 'svg' | 'png') => {
    const svgElement = this.getIconElement();
    if (!svgElement) {
      throw new Error('No SVG element found');
    }

    const a = document.createElement('a');
    a.href = await (format === 'svg'
      ? createSvgBlobFromElement(svgElement)
      : createPngBlobFromElement(svgElement));
    a.download = this.imageFileName(format);
    a.click();
  };

  private getIconElement() {
    const icon = this.elementRef.nativeElement.querySelector(`e-icon`) as HTMLElement;
    return icon?.shadowRoot?.querySelector('svg');
  }

  private imageFileName(format: 'svg' | 'png') {
    return `${this.selectedIcon()?.title}_${this.theme()}.${format}`;
  }
}
