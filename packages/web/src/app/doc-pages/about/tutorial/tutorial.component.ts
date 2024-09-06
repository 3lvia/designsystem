import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { SafeHtmlPipe } from '../../tools/team-symbol-doc/team-symbol-generator/safeHtml.pipe';
import { AngularTutorialComponent } from './angular-tutorial/angular-tutorial.component';
import { BlazorTutorialComponent } from './blazor-tutorial/blazor-tutorial.component';
import { ReactTutorialComponent } from './react-tutorial/react-tutorial.component';
import { VueTutorialComponent } from './vue-tutorial/vue-tutorial.component';
import { PreferredLanguageService } from 'src/app/shared/component-documentation/preferredLanguage.service';
import { LanguageType } from 'src/app/shared/component-documentation/types';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

const docPage = getDocPagesNotFromCMS('tutorial');

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    AngularTutorialComponent,
    VueTutorialComponent,
    ReactTutorialComponent,
    BlazorTutorialComponent,
    SafeHtmlPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TutorialComponent {
  description = docPage.description;
  title = docPage.title;
  isPopoverShowing = false;
  tabs = ['angular', 'vue', 'react', 'blazor'];

  private preferredLanguageService = inject(PreferredLanguageService);
  private preferredLanguage = toSignal(
    this.preferredLanguageService.listenLanguage(this.tabs.map((tab) => tab.toLowerCase() as LanguageType)),
  );

  activeTabIndex = computed(() => {
    const preferredLanguage = this.preferredLanguage();
    return this.tabs.findIndex((tab) => tab.toLowerCase() === preferredLanguage);
  });
  activeTabName = this.tabs[this.activeTabIndex()];

  setActiveTab(newIndex: number): void {
    this.activeTabName = this.tabs[newIndex];
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
