import { trigger, state, style, transition, animate, AnimationTriggerMetadata, query, keyframes } from '@angular/animations';


export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
    state(
        'void',
        style({
            transform: 'scale(0.8)',
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
