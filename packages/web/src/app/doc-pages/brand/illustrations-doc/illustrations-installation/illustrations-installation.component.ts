import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { heightAnimation } from 'src/app/shared/component-documentation/component-installation/animations';
import { PreferredLanguageService } from 'src/app/shared/component-documentation/preferredLanguage.service';
import { TabToSegmentedControlItemPipe } from 'src/app/shared/component-documentation/tabToSegmentedControlItem.pipe';
import { LanguageType, Tab } from 'src/app/shared/component-documentation/types';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-illustrations-installation',
  imports: [CopyComponent, TabToSegmentedControlItemPipe],
  templateUrl: './illustrations-installation.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [heightAnimation],
})
export class IllustrationsInstallationComponent {
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  private preferredLanguageService = inject(PreferredLanguageService);
  private preferredLanguage = toSignal(
    this.preferredLanguageService.listenLanguage(this.tabs.map((tab) => tab.toLowerCase() as LanguageType)),
  );

  activeTabIndex = computed(() => {
    const preferredLanguage = this.preferredLanguage();
    return this.tabs.findIndex((tab) => tab.toLowerCase() === preferredLanguage);
  });

  setActiveTab(newIndex: number): void {
    // @ts-expect-error TS2532 (LEGO-3683)
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
