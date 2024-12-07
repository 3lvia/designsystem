import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Modifier, Typographies } from '../typographies';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  imports: [FormsModule, TextFieldModule, CopyComponent],
  selector: 'app-typography-example-exhibit-list',
  templateUrl: './typography-example-exhibit-list.component.html',
  styleUrls: ['./typography-example-exhibit-list.component.scss'],
})
export class TypographyExampleExhibitListComponent {
  readonly typographies = input.required<Typographies>();
  readonly modifier = input.required<Modifier>();

  demoContent = 'The quick brown fox';
}
