import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-illustrations-exhibit-details',
  standalone: true,
  imports: [CopyComponent, IllustrationsGeneratorComponent],
  templateUrl: './illustrations-exhibit-details.component.html',
  styleUrl: './illustrations-exhibit-details.component.scss',
})
export class IllustrationsExhibitDetailsComponent {
  private illustrationExhibitService = inject(IllustrationsExhibitService);
  protected selectedIllustration = toSignal(this.illustrationExhibitService.selectedIllustration);
  protected colorValue = toSignal(this.illustrationExhibitService.colorValue);
  protected locale = toSignal(inject(LocalizationService).listenLocalization());

  get importString() {
    return `@elvia/illustrations/${this.selectedIllustration()}`;
  }

  get importStatement() {
    return `import '@elvia/illustrations/${this.selectedIllustration()}';`;
  }

  get colorString() {
    const color = this.colorValue();
    return !color || color === 'grey' ? '' : ` color="${color}"`;
  }

  get usageString() {
    return `<elvia-illustrations-${this.selectedIllustration()}${this.colorString} />`;
  }
  get usageCopyString() {
    return `<elvia-illustrations-${this.selectedIllustration()}${this.colorString}></elvia-illustrations-${this.selectedIllustration()}>`;
  }

  clearSelection() {
    this.illustrationExhibitService.setSelectedIllustration(null);
  }
}
