import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [heightAnimation],
  imports: [CopyComponent, TabToSegmentedControlItemPipe],
})
export class ComponentInstallationComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription;

  @Input() componentData: ComponentData;
  reactElementName: string;
  packageName: string;
  activeTabIndex: number = 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  constructor(private preferredLanguageService: PreferredLanguageService) {}

  ngOnInit() {
    this.reactElementName = this.componentData.name;
    this.packageName = getPackageName(this.componentData.name);

    this.languageSubscription = this.preferredLanguageService.preferredLanguage$.subscribe((value) => {
      this.activeTabIndex = this.tabs.findIndex((tab) => tab.toLowerCase() === value);
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  setActiveTab(newIndex: number): void {
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
