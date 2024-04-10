import { CUSTOM_ELEMENTS_SCHEMA, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Theme } from 'src/app/core/services/theme.service';
import { LocalThemeSwitchComponent } from 'src/app/shared/local-theme-switch/local-theme-switch.component';
import { IfViewportSizeDirective } from 'src/app/shared/viewport-size/if-viewport-size.directive';

@Component({
  selector: 'app-icon-preview-filter',
  standalone: true,
  imports: [FormsModule, LocalThemeSwitchComponent, IfViewportSizeDirective],
  templateUrl: './icon-preview-filter.component.html',
  styleUrl: './icon-preview-filter.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconPreviewFilterComponent {
  term = model('');
  filter = model('all');
  theme = model<Theme>('light');

  protected filterItems = [
    { label: 'All', value: 'all' },
    { label: 'Outline', value: 'outline' },
    { label: 'Filled', value: 'filled' },
    { label: 'Two colored', value: 'colored' },
  ];
}
