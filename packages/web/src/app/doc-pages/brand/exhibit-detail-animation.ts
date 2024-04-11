import { animate, style, transition, trigger } from '@angular/animations';

export const entranceAnimation = trigger('entranceAnimation', [
  transition(':enter', [
    style({ opacity: 0, translate: '0 24px' }),
    animate('200ms ease-in-out', style({ opacity: 1, translate: '0' })),
  ]),
  transition(':leave', [animate('200ms ease-in-out', style({ opacity: 0, translate: '0 24px' }))]),
]);
