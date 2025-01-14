import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CopyComponent } from '../../copy/copy.component';
import { PreferredLanguageService } from '../preferredLanguage.service';
import { TabToSegmentedControlItemPipe } from '../tabToSegmentedControlItem.pipe';
import { LanguageType, Tab } from '../types';
import { heightAnimation } from './animations';
import { getPackageName } from './getPackageName';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-component-installation',
  templateUrl: './component-installation.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [heightAnimation],
  imports: [CopyComponent, TabToSegmentedControlItemPipe],
})
export class ComponentInstallationComponent {
  readonly componentData = input.required<ComponentData>();
  reactElementName = computed(() => this.componentData().name);
  packageName = computed(() => getPackageName(this.componentData().name));
  activeTabIndex = 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  constructor(private preferredLanguageService: PreferredLanguageService) {
    this.preferredLanguageService
      .listenLanguage(this.tabs.map((tab) => tab.toLowerCase() as LanguageType))
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.activeTabIndex = this.tabs.findIndex((tab) => tab.toLowerCase() === value);
      });
  }

  setActiveTab(newIndex: number): void {
    // @ts-expect-error TS2532 (LEGO-3683)
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
