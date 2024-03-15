import { AsyncPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { IllustrationName, illustrationsExhibitData } from '../illustrations-exhibit-data';
import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';

@Component({
  selector: 'app-illustrations-exhibit-list',
  standalone: true,
  imports: [AsyncPipe, TitleCasePipe, NgClass, IllustrationsGeneratorComponent],
  templateUrl: './illustrations-exhibit-list.component.html',
  styleUrl: './illustrations-exhibit-list.component.scss',
})
export class IllustrationsExhibitListComponent {
  private illustrationExhibitService = inject(IllustrationsExhibitService);
  filterValue = this.illustrationExhibitService.searchValue;
  colorValue = this.illustrationExhibitService.colorValue;
  activeIllustration = this.illustrationExhibitService.selectedIllustration;

  illustrationsExhibitData = illustrationsExhibitData;

  setActiveIllustration = (name: IllustrationName) => {
    this.illustrationExhibitService.setSelectedIllustration(name);
  };
}
