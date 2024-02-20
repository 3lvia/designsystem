import { Component, Input } from '@angular/core';
import { Modifier, Typographies } from '../typographies';

import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  standalone: true,
  imports: [FormsModule, TextFieldModule, CopyComponent],
  selector: 'app-typography-example-exhibit-list',
  templateUrl: './typography-example-exhibit-list.component.html',
  styleUrls: ['./typography-example-exhibit-list.component.scss'],
})
export class TypographyExampleExhibitListComponent {
  @Input({ required: true }) typographies: Typographies;
  @Input({ required: true }) modifier: Modifier;

  demoContent = 'The quick brown fox';
}
