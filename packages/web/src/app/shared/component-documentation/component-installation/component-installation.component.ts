import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
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
export class ComponentInstallationComponent implements OnInit {
  @Input() componentData: ComponentData;
  reactElementName: string;
  packageName: string;
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

  ngOnInit() {
    this.reactElementName = this.componentData.name;
    this.packageName = getPackageName(this.componentData.name);
  }

  setActiveTab(newIndex: number): void {
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
