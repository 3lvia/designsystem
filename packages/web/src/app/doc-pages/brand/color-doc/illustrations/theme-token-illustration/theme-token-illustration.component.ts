import { Component } from '@angular/core';
import { IllustrationBaseDirective } from '../illustration-base.directive';

@Component({
  selector: 'app-theme-token-illustration',
  templateUrl: './theme-token-illustration.component.html',
  styleUrls: ['../shared-styles.scss', './theme-token-illustration.component.scss'],
})
export class ThemeTokenIllustrationComponent extends IllustrationBaseDirective {}
