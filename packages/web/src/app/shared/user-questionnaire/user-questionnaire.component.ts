import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { type DropdownItem } from '@elvia/elvis-dropdown';
import { UserQuestionnaireIllustrationComponent } from './user-questionnaire-illustration/user-questionnaire-illustration.component';
import { UserQuestionnaireService } from './user-questionnaire.service';

type FormName = 'role' | 'feedback';

@Component({
  selector: 'app-user-questionnaire',
  standalone: true,
  imports: [UserQuestionnaireIllustrationComponent],
  templateUrl: './user-questionnaire.component.html',
  styleUrl: './user-questionnaire.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserQuestionnaireComponent {
  isOpen = true;
  roller: DropdownItem[] = [
    { label: 'UX / UI designer', value: 'uxui-desiger' },
    { label: 'Tjenestedesigner', value: 'tjenestedesigner' },
    { label: 'Grafisk designer (Branding)', value: 'grafisk-designer' },
    { label: 'Frontend-utvikler', value: 'frontend-utvikler' },
    { label: 'Annet', value: 'annet' },
  ];
  rolle: string | undefined;
  step: FormName = 'role';

  constructor(private userQuestionnaireService: UserQuestionnaireService) {}

  onSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData as any);
    console.log(formObject);

    this.userQuestionnaireService.submitForm(formObject).subscribe(() => {});

    // Debugging, make submit toggle between the two views
    if (event.target && 'name' in event.target && typeof event.target.name === 'string') {
      switch (event.target.name as FormName) {
        case 'role': {
          this.step = 'feedback';
          break;
        }
        case 'feedback': {
          this.step = 'role';
          break;
        }
      }
    }
  };
}
