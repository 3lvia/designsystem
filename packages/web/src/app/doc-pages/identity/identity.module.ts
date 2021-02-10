import { NgModule } from '@angular/core';

import { IdentityStartModule } from './identity-start/identity-start.module';
import { ColorDocModule } from './color-doc/color-doc.module';
import { IconDocModule } from './icon-doc/icon-doc.module';
import { OverviewIdentityModule } from './overview-identity/overview-identity.module';
import { ShadowDocModule } from './shadow-doc/shadow-doc.module';
import { SpacingDocModule } from './spacing-doc/spacing-doc.module';
import { TypographyDocModule } from './typography-doc/typography-doc.module';
import { LogoDocModule } from './logo-doc/logo-doc.module';
import { GridDocModule } from './grid-doc/grid-doc.module';
import { ToneOfVoiceModule } from './tone-of-voice/tone-of-voice.module';
import { TheConceptModule } from './the-concept/the-concept.module';

@NgModule({
  imports: [
    IdentityStartModule,
    ColorDocModule,
    IconDocModule,
    OverviewIdentityModule,
    ShadowDocModule,
    SpacingDocModule,
    TypographyDocModule,
    GridDocModule,
    LogoDocModule,
    ToneOfVoiceModule,
    TheConceptModule,
  ],
})
export class IdentityModule {}
