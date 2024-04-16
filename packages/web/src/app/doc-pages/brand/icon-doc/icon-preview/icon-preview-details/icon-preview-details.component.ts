import { NgClass } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Icon } from '../utils';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-icon-preview-details',
  standalone: true,
  imports: [NgClass, CopyComponent],
  templateUrl: './icon-preview-details.component.html',
  styleUrl: './icon-preview-details.component.scss',
})
export class IconPreviewDetailsComponent {
  selectedIcon = model.required<Icon | null>();

  locale = toSignal(inject(LocalizationService).listenLocalization());
}
