import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { heightAnimation } from 'src/app/shared/component-documentation/component-installation/animations';
import { PreferredLanguageService } from 'src/app/shared/component-documentation/preferredLanguage.service';
import { TabToSegmentedControlItemPipe } from 'src/app/shared/component-documentation/tabToSegmentedControlItem.pipe';
import { LanguageType, Tab } from 'src/app/shared/component-documentation/types';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-illustrations-installation',
  standalone: true,
  imports: [CopyComponent, TabToSegmentedControlItemPipe],
  templateUrl: './illustrations-installation.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [heightAnimation],
})
export class IllustrationsInstallationComponent {
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  private preferredLanguageService = inject(PreferredLanguageService);
  private preferredLanguage = toSignal(this.preferredLanguageService.preferredLanguage$);

  activeTabIndex = computed(() => {
    const preferredLanguage = this.preferredLanguage();
    return this.tabs.findIndex((tab) => tab.toLowerCase() === preferredLanguage);
  });

  setActiveTab(newIndex: number): void {
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
