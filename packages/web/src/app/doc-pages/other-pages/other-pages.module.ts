import { NgModule } from '@angular/core';
import { ChangelogModule } from './changelog/changelog.module';
import { ColorDocModule } from './color-doc/color-doc.module';
import { ContactModule } from './contact/contact.module';
import { ContributeModule } from './contribute/contribute.module';
import { FaqDocModule } from './faq-doc/faq-doc.module';
import { GetStartedDocModule } from './get-started-doc/get-started-doc.module';
import { IconDocModule } from './icon-doc/icon-doc.module';
import { LayoutDocModule } from './layout-doc/layout-doc.module';
import { ShadowDocModule } from './shadow-doc/shadow-doc.module';
import { TheDesignSystemDocModule } from './the-design-system-doc/the-design-system-doc.module';
import { TypographyDocModule } from './typography-doc/typography-doc.module';
import { UtilitiesDocModule } from './utilities-doc/utilities-doc.module';
import { ColorModule } from './color/color.module';

@NgModule({
  imports: [
    ColorDocModule,
    ColorModule,
    IconDocModule,
    TypographyDocModule,
    LayoutDocModule,
    GetStartedDocModule,
    UtilitiesDocModule,
    ContributeModule,
    FaqDocModule,
    ChangelogModule,
    ContactModule,
    TheDesignSystemDocModule,
    ShadowDocModule,
  ],
})
export class OtherPagesModule {}
