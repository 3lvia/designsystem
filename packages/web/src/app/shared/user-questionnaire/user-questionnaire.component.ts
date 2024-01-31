import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { type DropdownItem } from '@elvia/elvis-dropdown';
import { type DropdownProps } from '@elvia/elvis-dropdown/react';
import { UserQuestionnaireIllustrationComponent } from './user-questionnaire-illustration/user-questionnaire-illustration.component';
import { UserQuestionnaireService } from './user-questionnaire.service';
import '@elvia/elvis-modal';
import '@elvia/elvis-dropdown';
import { CommonModule } from '@angular/common';
import { type ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

type FormName = 'role' | 'feedback';

const USER_QUESTIONNAIRE_STORAGE_KEY = 'hasCompletedUserQuestionnaire-30.01.2024';

/**
 * Remember to delete the form-element from index.html when this component is removed!
 * It is only there for Netlify Forms to function.
 */

@Component({
  selector: 'app-user-questionnaire',
  standalone: true,
  imports: [CommonModule, UserQuestionnaireIllustrationComponent],
  templateUrl: './user-questionnaire.component.html',
  styleUrl: './user-questionnaire.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserQuestionnaireComponent {
  @ViewChild('form') form: ElementRef<HTMLFormElement>;
  @ViewChild('modal') modal: ElementRef<ElvisComponentWrapper>;
  roles: DropdownItem[] = [
    { label: 'UX / UI designer', value: 'uxui-desiger' },
    { label: 'Tjenestedesigner', value: 'tjenestedesigner' },
    { label: 'Grafisk designer / Branding', value: 'grafisk-designer-branding' },
    { label: 'Frontend-utvikler', value: 'frontend-utvikler' },
    { label: 'Backend-utvikler', value: 'backend-utvikler' },
    { label: 'Innholdsprodusent', value: 'innholdsprodusent' },
    { label: 'Salg og markedsføring', value: 'salg-og-markedsføring' },
    { label: 'Human Resources', value: 'human-resources' },
    { label: 'Produkteier', value: 'produkteier' },
    { label: 'Prosjektleder', value: 'prosjektleder' },
    { label: 'Ledelse', value: 'ledelse' },
    { label: 'Annet', value: 'annet' },
  ];
  role: string | undefined;
  hasElviaAccount = true;
  step: FormName = 'role';
  dropdownErrorState?: DropdownProps['errorOptions'];
  isOpen = false;
  private hasPreviouslyBeenCompleted = localStorage.getItem(USER_QUESTIONNAIRE_STORAGE_KEY) === 'true';

  constructor(private userQuestionnaireService: UserQuestionnaireService) {
    if (!this.hasPreviouslyBeenCompleted) {
      setTimeout(() => (this.isOpen = true), 1500);
    }
  }

  handleButtonClick = () => {
    switch (this.step) {
      case 'role':
        if (!this.role) {
          this.dropdownErrorState = { isErrorState: true, text: 'Velg din rolle' };
          return;
        }

        // Hack to remove / hide illustration for 2nd page
        const slots = this.modal.nativeElement.getAllSlots();
        delete slots['illustration'];
        this.modal.nativeElement.setProps({ illustration: undefined });

        this.dropdownErrorState = undefined;
        this.step = 'feedback';
        break;

      case 'feedback':
        this.triggerSubmitForm(this.form.nativeElement);
        this.isOpen = false;
        this.setHasCompletedOrClosedQuestionnaire();
        break;
    }
  };

  onModalClose = () => {
    // Submit form if modal is closed after the first page is filled, but without filling the 2nd page
    if (this.step !== 'role') {
      this.triggerSubmitForm(this.form.nativeElement);
    }
    this.isOpen = false;
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
