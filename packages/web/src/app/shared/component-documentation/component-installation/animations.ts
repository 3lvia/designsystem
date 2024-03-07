import { animate, style, transition, trigger } from '@angular/animations';

export const heightAnimation = trigger('heightAnimation', [
  transition(':enter', [
    style({ opacity: 0.5, height: 0 }),
    animate('400ms ease-in', style({ opacity: 1, height: '*' })),
  ]),
  transition(':leave', [animate('400ms ease-in', style({ opacity: 0.5, height: 0, overflow: 'hidden' }))]),
]);
