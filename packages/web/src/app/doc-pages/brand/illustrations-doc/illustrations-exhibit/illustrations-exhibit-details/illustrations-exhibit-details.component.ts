import { Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { IllustrationsGeneratorComponent } from '../illustrations-generator/illustrations-generator.component';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-illustrations-exhibit-details',
  standalone: true,
  imports: [CopyComponent, IllustrationsGeneratorComponent],
  templateUrl: './illustrations-exhibit-details.component.html',
  styleUrl: './illustrations-exhibit-details.component.scss',
})
export class IllustrationsExhibitDetailsComponent {
  selectedIllustration = toSignal(
    inject(IllustrationsExhibitService).selectedIllustration.pipe(takeUntilDestroyed(), filter(Boolean)),
  );
  illustrationExhibitService = inject(IllustrationsExhibitService);

  get importString() {
    return `@elvia/illustrations/${this.selectedIllustration()}`;
  }
  get importStatement() {
    return `import '@elvia/illustrations/${this.selectedIllustration()}';`;
  }
  get usageString() {
    return `<elvia-illustrations-${this.selectedIllustration()}>`;
  }
  get usageCopyString() {
    return `<elvia-illustrations-${this.selectedIllustration()}></elvia-illustrations-${this.selectedIllustration()}>`;
  }

  clearSelection() {
    this.illustrationExhibitService.setSelectedIllustration(null);
  }
}
