import { trigger, state, style, transition, animate, AnimationTriggerMetadata, query, keyframes } from '@angular/animations';

export const slideIn: AnimationTriggerMetadata = trigger('slideIn', [
  state(
    'void',
    style({
      left: -200,
    })
  ),
  state(
    '*',
    style({
      left: 0
    })
  ),
  transition('void => *', animate('350ms cubic-bezier(.08, 0, .01, 1)')),
  transition('* => void', animate('350ms cubic-bezier(.55, 0, .88, 1)'))
]);

export const heightDown: AnimationTriggerMetadata = trigger('heightDown', [
  state(
    'void',
    style({
      height: 0,
      opacity: 0
    })
  ),
  state(
    '*',
    style({
      height: '*',
      opacity: 1
    })
  ),
  transition('void => *', animate(`250ms cubic-bezier(0.6, 0, 0.1, 1)`)),
  transition('* => void', animate(`250ms cubic-bezier(.55, 0, .88, 1)`))
]);
