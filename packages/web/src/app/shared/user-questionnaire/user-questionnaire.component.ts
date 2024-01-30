import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { type DropdownItem } from '@elvia/elvis-dropdown';
import { type DropdownProps } from '@elvia/elvis-dropdown/react';
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
  @ViewChild('form') form: ElementRef<HTMLFormElement>;
  roles: DropdownItem[] = [
    { label: 'UX / UI designer', value: 'uxui-desiger' },
    { label: 'Tjenestedesigner', value: 'tjenestedesigner' },
    { label: 'Grafisk designer (Branding)', value: 'grafisk-designer' },
    { label: 'Frontend-utvikler', value: 'frontend-utvikler' },
    { label: 'Backend-utvikler', value: 'backend-utvikler' },
    { label: 'Innholdsprodusent', value: 'innholdsprodusent' },
    { label: 'Salg og markedsføring', value: 'salg-og-markedsføring' },
    { label: 'HR (Human Resources)', value: 'hr-(human-resources)' },
    { label: 'Produkteier', value: 'produkteier' },
    { label: 'Prosjektleder', value: 'prosjektleder' },
    { label: 'Ledelse', value: 'ledelse' },
    { label: 'Annet', value: 'annet' },
  ];
  role: string | undefined;
  step: FormName = 'role';
  dropdownErrorState?: DropdownProps['errorOptions'];

  private hasPreviouslyBeenCompleted = localStorage.getItem(USER_QUESTIONNAIRE_STORAGE_KEY) === 'true';

  // Only open modal on mount if the questionnaire hasn't been completed before
  isOpen = !this.hasPreviouslyBeenCompleted;

  constructor(private userQuestionnaireService: UserQuestionnaireService) {}

  goToFeedback = () => {
    if (!this.role) {
      this.dropdownErrorState = { isErrorState: true, text: 'Velg din rolle' };
      return;
    }
    this.dropdownErrorState = undefined;
    this.step = 'feedback';
  };

  onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    this.triggerSubmitForm(event.target as HTMLFormElement);
  };

  onModalClose = () => {
    // Submit form if modal is closed after the first page is filled, but without filling the 2nd page
    if (this.step !== 'role') {
      this.triggerSubmitForm(this.form.nativeElement);
    }
    this.isOpen = !this.isOpen;
    this.setHasCompletedOrClosedQuestionnaire();
  };

  private triggerSubmitForm = (formElement: HTMLFormElement) => {
    if (this.hasPreviouslyBeenCompleted) {
      return;
    }
    const formData = new FormData(formElement);
    const formState = Object.fromEntries(formData as any);

    this.userQuestionnaireService.submitForm(formState).subscribe();
  };

  private setHasCompletedOrClosedQuestionnaire = () => {
    // localStorage.setItem(USER_QUESTIONNAIRE_STORAGE_KEY, 'true');
  };
}
