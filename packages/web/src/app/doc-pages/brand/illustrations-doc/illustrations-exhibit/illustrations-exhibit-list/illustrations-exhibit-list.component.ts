import { AsyncPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { IllustrationName, illustrationsExhibitData } from '../illustrations-exhibit-data';
import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';
import { IllustrationsExhibitListDisplayNamePipe } from './illustrations-exhibit-list-display-name.pipe';
import { IllustrationsExhibitListSearchPipe } from './illustrations-exhibit-list-search.pipe';

@Component({
  selector: 'app-illustrations-exhibit-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    IllustrationsGeneratorComponent,
    IllustrationsExhibitListSearchPipe,
    IllustrationsExhibitListDisplayNamePipe,
  ],
  templateUrl: './illustrations-exhibit-list.component.html',
  styleUrl: './illustrations-exhibit-list.component.scss',
})
export class IllustrationsExhibitListComponent {
  private illustrationExhibitService = inject(IllustrationsExhibitService);
  searchValue = this.illustrationExhibitService.searchValue;
  colorValue = this.illustrationExhibitService.colorValue;
  activeIllustration = this.illustrationExhibitService.selectedIllustration;

  illustrationsExhibitData = illustrationsExhibitData;

  setActiveIllustration = (name: IllustrationName) => {
    this.illustrationExhibitService.setSelectedIllustration(name);
  };
}
