import { trigger, state, style, transition, animate, AnimationTriggerMetadata, query, keyframes } from '@angular/animations';

export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
    state(
        'void',
        style({
            transform: 'scale(0.7)',
            opacity: 0
        })
    ),
    state(
        '*',
        style({
            transform: 'scale(1)',
            opacity: 1
        })
    ),
    transition('void => *', animate('250ms cubic-bezier(.08, 0, .01, 1)')),
    transition('* => void', animate('250ms cubic-bezier(.55, 0, .88, 1)'))
]);

export const scaleUp: AnimationTriggerMetadata = trigger('scaleUp', [
  state(
    'void',
    style({
      transform: 'scale(.7, .5)',
      height: 0,
      opacity: 0
    })
  ),
  state(
    '*',
    style({
      transform: 'scale(1)',
      height: '*',
      opacity: 1
    })
  ),
  transition('void => *', animate('250ms cubic-bezier(.08, 0, .01, 1)')),
  transition('* => void', animate('250ms cubic-bezier(.55, 0, .88, 1)'))
]);

export const scaleDown: AnimationTriggerMetadata = trigger('scaleDown', [
  state(
    'void',
    style({
      transform: 'scale(1)',
      height: '*',
      opacity: 1
    })
  ),
  state(
    '*',
    style({
      transform: 'scale(.7, .5)',
      height: 0,
      opacity: 0
    })
  ),
  transition('void => *', animate('250ms cubic-bezier(.55, 0, .88, 1)')),
  transition('* => void', animate('250ms cubic-bezier(.08, 0, .01, 1)'))
]);

export const scaleDowncurtainDown: AnimationTriggerMetadata = trigger('curtainDown', [
  state(
    'void',
    style({
      transform: 'scaleY(.7)',
      height: 0,
      opacity: 0
    })
  ),
  state(
    '*',
    style({
      transform: 'scaleY(1)',
      height: '*',
      opacity: 1
    })
  ),
  transition('void => *', animate('250ms cubic-bezier(.08, 0, .01, 1)')),
  transition('* => void', animate('250ms cubic-bezier(.55, 0, .88, 1)'))
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

export const listAnimation: AnimationTriggerMetadata = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':enter',
      animate(
        '500ms cubic-bezier(0.6, 0, 0, 1)',
        keyframes([
          style({ opacity: 0, transform: 'translateY(-20px)', height: 0, offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', height: '*', offset: 1 })
        ])
      ),
      { optional: true }
    ),
    query(':leave', animate('500ms cubic-bezier(0.6, 0, 0.1, 1)', style({ height: 0, opacity: 0, transform: 'scaleX(.6) scaleY(.6)' })), {
      optional: true
    })
  ])
]);

export const popUpAnimation: AnimationTriggerMetadata = trigger('popUpAnimation', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'scale(0.7)'
    })
  ),
  state(
    '*',
    style({
      opacity: 1,
      transform: 'scale(1)'
    })
  ),
  transition('void => *', animate(`150ms`)),
  transition('* => void', animate(`150ms`))
]);

export const autoCompleteAnimation: AnimationTriggerMetadata = trigger('autoCompleteAnimation', [
  transition('* => *', [
    query(
      ':enter',
      animate(
        '60ms',
        keyframes([
          style({ opacity: 0, height: 0, offset: 0 }),
          style({ opacity: 1, height: '*', offset: 1 })
        ])
      ),
      { optional: true }
    ),
    query(':leave', animate('60ms', style({ height: 0, opacity: 0 })), {
      optional: true
    })
  ])
]);
