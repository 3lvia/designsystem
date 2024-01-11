import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { openElviaToast, ToastConfig } from '@elvia/elvis-toast';
import { pairwise } from 'rxjs';
import {
  CegControlManager,
  ComponentExample,
  TypescriptComponentExample,
} from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-toast-ceg',
  templateUrl: './toast-ceg.component.html',
  providers: [
    { provide: ComponentExample, useExisting: ToastCegComponent },
    { provide: TypescriptComponentExample, useExisting: ToastCegComponent },
  ],
})
export class ToastCegComponent extends TypescriptComponentExample implements ComponentExample {
  elementName = 'toast';
  toastConfig: Record<string, string | boolean | number | undefined>;
  cegContent = new CegControlManager<ToastConfig>([
    {
      controls: {
        status: {
          type: 'radioGroup',
          group: 'Status',
          value: 'positive',
          radios: [
            { label: 'Positive', value: 'positive' },
            { label: 'Informative', value: 'informative' },
            { label: 'Negative', value: 'negative' },
          ],
          excludedFromDOM: true,
        },
        closable: { type: 'switch', group: 'Options', label: 'Closable', excludedFromDOM: true },
        title: {
          type: 'text',
          group: 'Title',
          label: 'Title',
          value: '',
          placeholder: 'Title for the toast',
          excludedFromDOM: true,
        },
        body: {
          type: 'text',
          group: 'Body',
          label: 'Body',
          value: 'Handlingen var vellykket',
          excludedFromDOM: true,
        },
      },
      groupOrder: ['Status', 'Options', 'Title', 'Body'],
    },
  ]);

  constructor() {
    super();

    this.cegContent
      .getCurrentControls()
      .pipe(takeUntilDestroyed())
      .subscribe((controls) => {
        if (controls) {
          this.toastConfig = {};
          Object.entries(controls).forEach(([controlName, control]) => {
            const key = controlName as keyof ToastConfig;
            this.toastConfig[key] = control.value;
          });

          this.setTypescript(`import { openElviaToast } from '@elvia/elvis-toast';

          export const showToast = () => {
            openElviaToast(${JSON.stringify(this.toastConfig)});
          }`);
        }
      });

    this.cegContent
      .getCurrentControls()
      .pipe(takeUntilDestroyed(), pairwise())
      .subscribe(([prevControls, newControls]) => {
        if (prevControls?.status?.value !== newControls?.status?.value) {
          if (!newControls?.body!.value || !newControls.status?.value) {
            return;
          }
          switch (newControls.status.value) {
            case 'positive':
              // Set value of object to update the CEG control
              newControls.body.value = 'Handlingen var vellykket';
              // Call setPropValue to update the value in the generated code
              this.cegContent.setPropValue('body', `Handlingen var vellykket`);
              break;
            case 'informative':
              newControls.body.value = 'Ny kommentar på målenummer 9823';
              this.cegContent.setPropValue('body', `Ny kommentar på målenummer 9823`);
              break;
            case 'negative':
              newControls.body.value = 'Status satt til uløst';
              this.cegContent.setPropValue('body', `Status satt til uløst`);
              break;
          }
        }
      });
  }

  showToast(): void {
    openElviaToast(this.toastConfig);
  }
}
