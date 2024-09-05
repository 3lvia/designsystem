import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CodeViewerComponent } from '../../../../shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';
import { heightAnimation } from 'src/app/shared/component-documentation/component-installation/animations';
import { PreferredLanguageService } from 'src/app/shared/component-documentation/preferredLanguage.service';
import { TabToSegmentedControlItemPipe } from 'src/app/shared/component-documentation/tabToSegmentedControlItem.pipe';
import { LanguageType, Tab } from 'src/app/shared/component-documentation/types';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-icon-installation',
  standalone: true,
  imports: [CopyComponent, TabToSegmentedControlItemPipe, CodeViewerComponent],
  templateUrl: './icon-installation.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [heightAnimation],
})
export class IconInstallationComponent {
  tabs: Tab[] = ['Angular', 'React', 'Vue'];
  typescriptExample = `import { addIcons } from '@elvia/elvis-icons';
  import { accessControl, addCircle } from '@elvia/elvis-assets-icons';

  addIcons({
  accessControl: { svg: accessControl.getIcon() },
  addCircle: { svg: addCircle.getIcon() },
  });`;

  private preferredLanguageService = inject(PreferredLanguageService);
  private preferredLanguage = toSignal(
    this.preferredLanguageService.listenLanguage(this.tabs.map((tab) => tab.toLowerCase() as LanguageType)),
  );

  activeTabIndex = computed(() =>
    this.tabs.findIndex((tab) => tab.toLowerCase() === this.preferredLanguage()),
  );

  setActiveTab(newIndex: number): void {
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
