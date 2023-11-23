import { Component, Input } from '@angular/core';
import { Modifier, Typographies } from '../typographies';
import { CopyModule } from 'src/app/shared/copy/copy.module';

@Component({
  standalone: true,
  imports: [CopyModule],
  selector: 'app-typography-example-exhibit-list',
  templateUrl: './typography-example-exhibit-list.component.html',
  styleUrls: ['./typography-example-exhibit-list.component.scss'],
})
export class TypographyExampleExhibitListComponent {
  @Input({ required: true }) typographies: Typographies;
  @Input({ required: true }) modifier: Modifier;

  demoContent = 'The quick brown fox';
}
