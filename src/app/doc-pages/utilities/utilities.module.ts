import { NgModule } from '@angular/core';

import { UtilitiesStartModule } from './utilities-start/utilities-start.module';
import { BorderDocModule } from './border-doc/border-doc.module';
import { ColorDocModule } from './color-doc/color-doc.module';
import { IconDocModule } from './icon-doc/icon-doc.module';
import { NewProjectModule } from './new-project/new-project.module';
import { OverviewUtilModule } from './overview-util/overview-util.module';
import { ShadowDocModule } from './shadow-doc/shadow-doc.module';
import { SpacingDocModule } from './spacing-doc/spacing-doc.module';
import { TypographyDocModule } from './typography-doc/typography-doc.module';
import { TemplatesModule } from './templates/templates.module';
import { TypographyMobileModule } from './typography-doc/typography-mobile/typography-mobile.module';

@NgModule({
    imports: [
        UtilitiesStartModule,
        BorderDocModule,
        ColorDocModule,
        IconDocModule,
        NewProjectModule,
        OverviewUtilModule,
        ShadowDocModule,
        SpacingDocModule,
        TypographyDocModule,
        TypographyMobileModule,
        TemplatesModule
    ]
})
export class UtilitiesModule { }


