import { Component } from '@angular/core';
import { IllustrationBaseDirective } from '../illustration-base.directive';

@Component({
  selector: 'app-purpose-token-illustration',
  templateUrl: './purpose-token-illustration.component.html',
  styleUrls: ['../shared-styles.scss', './purpose-token-illustration.component.scss'],
})
export class PurposeTokenIllustrationComponent extends IllustrationBaseDirective {}
