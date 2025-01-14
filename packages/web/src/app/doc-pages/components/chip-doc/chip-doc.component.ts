import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ChipCegComponent } from './chip-ceg/chip-ceg.component';
import { chipData } from './chip-data';
import { ChipImageCegComponent } from './chip-image-ceg/chip-image-ceg.component';
import { ChipImageEmptyCegComponent } from './chip-image-empty-ceg/chip-image-empty-ceg.component';

@Component({
  selector: 'app-chips',
  templateUrl: './chip-doc.component.html',
  styleUrls: ['./chip-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    ChipCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    StaticCegComponent,
    ChipImageCegComponent,
    ChipImageEmptyCegComponent,
    WhenToUseComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipDocComponent {
  does: [
    'Used together with a filter so the user has control and an overview of what is selected',
    'Simple way for the user to toggle data on and off',
  ];

  componentData = chipData;

  deletableChipsList = [
    { value: 2022, color: 'green' },
    { value: 2023, color: 'blue' },
    { value: 2024, color: 'purple', isDisabled: true },
  ];

  deletableChipsListInType = [
    { value: 2019 },
    { value: 2020, color: 'green' },
    { value: 2021, color: 'green', isDisabled: true },
  ];

  colorChips: { value: string; color: string; disabled?: boolean }[] = [
    { value: '2019', color: 'red' },
    { value: '2021', color: 'red' },
    { value: '1239840912', color: 'purple' },
    { value: '1239240913', color: 'purple' },
    { value: '1239240915', color: 'purple' },
    { value: 'Ola Nordmann', color: 'green' },
  ];

  handleOnDelete = (event: number): void => {
    this.deletableChipsList = [...this.deletableChipsList].filter((value) => value.value !== event);
  };

  handleOnDeleteInType = (event: number): void => {
    this.deletableChipsListInType = [...this.deletableChipsListInType].filter(
      (value) => value.value !== event,
    );
  };

  handleOnDeleteColor = (event: string): void => {
    this.colorChips = [...this.colorChips].filter((value) => value.value !== event);
  };
}
