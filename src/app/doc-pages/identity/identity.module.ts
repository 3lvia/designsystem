import { NgModule } from '@angular/core';

import { IdentityStartModule } from './identity-start/identity-start.module';
import { BorderDocModule } from './border-doc/border-doc.module';
import { ColorDocModule } from './color-doc/color-doc.module';
import { IconDocModule } from './icon-doc/icon-doc.module';
import { OverviewIdentityModule } from './overview-identity/overview-identity.module';
import { ShadowDocModule } from './shadow-doc/shadow-doc.module';
import { SpacingDocModule } from './spacing-doc/spacing-doc.module';
import { TypographyDocModule } from './typography-doc/typography-doc.module';
import { LogoDocModule } from './logo-doc/logo-doc.module';
import { GridDocModule } from './grid-doc/grid-doc.module';
import { AlignmentDocModule } from './alignment-doc/alignment-doc/alignment-doc.module';
import { UtilitiesDocModule } from './utilities-doc/utilities-doc.module';

@NgModule({
  imports: [
    IdentityStartModule,
    BorderDocModule,
    ColorDocModule,
    IconDocModule,
    OverviewIdentityModule,
    ShadowDocModule,
    SpacingDocModule,
    TypographyDocModule,
    GridDocModule,
    LogoDocModule,
    AlignmentDocModule,
    UtilitiesDocModule,
  ],
})
export class IdentityModule { }
