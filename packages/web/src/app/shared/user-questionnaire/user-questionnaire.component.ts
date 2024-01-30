import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { type DropdownItem } from '@elvia/elvis-dropdown';
import { UserQuestionnaireIllustrationComponent } from './user-questionnaire-illustration/user-questionnaire-illustration.component';
import { UserQuestionnaireService } from './user-questionnaire.service';
import '@elvia/elvis-modal';
import '@elvia/elvis-dropdown';

type FormName = 'role' | 'feedback';

const USER_QUESTIONNAIRE_STORAGE_KEY = 'hasCompletedUserQuestionnaire-30.01.2024';

/**
 * Remember to delete the empty <form>-elements from index.html when this component is removed!
 */

@Component({
  selector: 'app-user-questionnaire',
  standalone: true,
  imports: [UserQuestionnaireIllustrationComponent],
  templateUrl: './user-questionnaire.component.html',
  styleUrl: './user-questionnaire.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserQuestionnaireComponent {
  roller: DropdownItem[] = [
    { label: 'UX / UI designer', value: 'uxui-desiger' },
    { label: 'Tjenestedesigner', value: 'tjenestedesigner' },
    { label: 'Grafisk designer (Branding)', value: 'grafisk-designer' },
    { label: 'Frontend-utvikler', value: 'frontend-utvikler' },
    { label: 'Annet', value: 'annet' },
  ];
  rolle: string | undefined;
  step: FormName = 'role';

  private hasBeenCompleted = localStorage.getItem(USER_QUESTIONNAIRE_STORAGE_KEY) === 'true';

  // Only open modal on mount if the questionnaire hasn't been completed before
  isOpen = !this.hasBeenCompleted;

  constructor(private userQuestionnaireService: UserQuestionnaireService) {}

  onSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formState = Object.fromEntries(formData as any);

    this.userQuestionnaireService.submitForm(formState).subscribe(() => {
      if (this.step === 'role') {
        this.step = 'feedback';
        this.setHasCompletedOrClosedQuestionnaire();
      } else if (this.step === 'feedback') {
        this.isOpen = false;
      }
    });

    // Debugging, make submit send to next form even when submit fails
    // if (this.step === 'role') {
    //   this.step = 'feedback';
    //   this.setHasCompletedOrClosedQuestionnaire();
    // } else if (this.step === 'feedback') {
    //   this.isOpen = false;
    // }
  };

  onModalClose = () => {
    this.isOpen = !this.isOpen;
    this.setHasCompletedOrClosedQuestionnaire();
  };

  private setHasCompletedOrClosedQuestionnaire = () => {
    localStorage.setItem(USER_QUESTIONNAIRE_STORAGE_KEY, 'true');
  };
}
