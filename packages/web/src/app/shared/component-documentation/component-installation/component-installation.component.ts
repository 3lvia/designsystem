import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CopyComponent } from '../../copy/copy.component';
import { LocalStorageService } from '../localstorage.service';
import { getPackageName } from './getPackageName';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-component-installation',
  templateUrl: './component-installation.component.html',
  standalone: true,
  imports: [CopyComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentInstallationComponent implements OnInit, OnDestroy {
  private storageSubscription: Subscription;

  @Input() componentData: ComponentData;
  reactElementName: string;
  packageName: string;
  activeTabIndex: number = 0;

  constructor(private localStorageService: LocalStorageService) {
    this.activeTabIndex = this.localStorageService.getItem();
  }

  ngOnInit() {
    this.reactElementName = this.componentData.name;
    this.packageName = getPackageName(this.componentData.name);

    this.storageSubscription = this.localStorageService.storageChanged.subscribe((value) => {
      this.activeTabIndex = value;
    });
  }

  ngOnDestroy(): void {
    this.storageSubscription.unsubscribe();
  }

  setActiveTab(newIndex: number): void {
    this.localStorageService.setItem(newIndex);
    this.activeTabIndex = newIndex;
  }
}
