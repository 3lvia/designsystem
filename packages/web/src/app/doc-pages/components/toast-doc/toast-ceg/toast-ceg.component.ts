import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { openElviaToast, ToastConfig } from '@elvia/elvis-toast';
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
          ],
          excludedFromDomProps: true,
        },
        closable: { type: 'switch', group: 'Options', label: 'Closable', excludedFromDomProps: true },
        title: {
          type: 'text',
          group: 'Title',
          label: 'Title',
          value: 'Short title',
          excludedFromDomProps: true,
        },
        body: {
          type: 'text',
          group: 'Body',
          label: 'Body',
          value: 'A successful confirmation message.',
          excludedFromDomProps: true,
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
  }

  showToast(): void {
    openElviaToast(this.toastConfig);
  }
}
