import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  styleUrl: './illustrations-installation.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [heightAnimation],
})
export class IllustrationsInstallationComponent {
  activeTabIndex: number = 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  constructor(private preferredLanguageService: PreferredLanguageService) {
    this.preferredLanguageService.preferredLanguage$.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.activeTabIndex = this.tabs.findIndex((tab) => tab.toLowerCase() === value);
    });
  }

  setActiveTab(newIndex: number): void {
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
