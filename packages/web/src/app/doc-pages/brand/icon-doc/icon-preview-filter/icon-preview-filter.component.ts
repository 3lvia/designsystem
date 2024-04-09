import { CUSTOM_ELEMENTS_SCHEMA, Component, effect, output, signal } from '@angular/core';
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
  searchChange = output<string>();
  filterChange = output<string>();
  themeChange = output<Theme>();
  protected term = signal('');
  protected filter = signal('all');
  protected theme = signal<Theme>('light');

  constructor() {
    effect(() => {
      this.searchChange.emit(this.term());
    });
    effect(() => {
      this.filterChange.emit(this.filter());
    });
    effect(() => {
      this.themeChange.emit(this.theme());
    });
  }
}
