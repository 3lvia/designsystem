import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ErrorComponent {
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('404: Not Found | Elvia design system');
  }
}
