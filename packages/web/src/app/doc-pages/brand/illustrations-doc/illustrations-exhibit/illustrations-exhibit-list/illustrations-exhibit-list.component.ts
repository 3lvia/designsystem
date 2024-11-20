import { NgClass } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IllustrationName, illustrationsExhibitData } from '../illustrations-exhibit-data';
import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';
import { IllustrationsExhibitListDisplayNamePipe } from './illustrations-exhibit-list-display-name.pipe';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-illustrations-exhibit-list',
  imports: [NgClass, IllustrationsGeneratorComponent, IllustrationsExhibitListDisplayNamePipe],
  templateUrl: './illustrations-exhibit-list.component.html',
  styleUrl: './illustrations-exhibit-list.component.scss',
})
export class IllustrationsExhibitListComponent {
  private illustrationExhibitService = inject(IllustrationsExhibitService);
  locale = toSignal(inject(LocalizationService).listenLocalization());
  searchValue = toSignal(this.illustrationExhibitService.searchValue);
  colorValue = toSignal(this.illustrationExhibitService.colorValue);
  activeIllustration = toSignal(this.illustrationExhibitService.selectedIllustration);
  theme = toSignal(this.illustrationExhibitService.theme);

  filteredIllustrationData = illustrationsExhibitData;
  private displayNamePipe = new IllustrationsExhibitListDisplayNamePipe();
  constructor() {
    effect(() => {
      const searchValue = this.searchValue();
      this.filteredIllustrationData = illustrationsExhibitData.filter((entry) => {
        if (!searchValue) {
          return true;
        }
        const searchValueLower = searchValue.toLowerCase();
        const searchKeyWords =
          this.locale() === 'nb-NO' ? (entry.searchKeywordsNO ?? entry.searchKeywords) : entry.searchKeywords;
        return (
          this.displayNamePipe.transform(entry.name).toLowerCase().includes(searchValueLower) ||
          searchKeyWords.some((keyword) => keyword.toLowerCase().includes(searchValueLower))
        );
      }) as typeof illustrationsExhibitData;
    });
  }

  setActiveIllustration = (name: IllustrationName) => {
    this.illustrationExhibitService.setSelectedIllustration(name);
  };
}
