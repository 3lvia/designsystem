import { NgModule } from '@angular/core';
import { AccessibilityDocModule } from './accessibility-doc/accessibility-doc.module';
import { ChangelogModule } from './changelog/changelog.module';
import { ColorDocModule } from './color-doc/color-doc.module';
import { ContactModule } from './contact/contact.module';
import { ContributeModule } from './contribute/contribute.module';
import { DesignProcessDocModule } from './design-process-doc/design-process-doc.module';
import { FaqDocModule } from './faq-doc/faq-doc.module';
import { GetStartedDesignersModule } from './get-started-designers/get-started-designers.module';
import { GetStartedDocModule } from './get-started-doc/get-started-doc.module';
import { IconDocModule } from './icon-doc/icon-doc.module';
import { LayoutDocModule } from './layout-doc/layout-doc.module';
import { LogoDocModule } from './logo-doc/logo-doc.module';
import { NewProjectModule } from './new-project/new-project.module';
import { PatternsDocModule } from './patterns-doc/patterns-doc.module';
import { TheConceptModule } from './the-concept/the-concept.module';
import { TheDesignSystemDocModule } from './the-design-system-doc/the-design-system-doc.module';
import { ToneOfVoiceModule } from './tone-of-voice/tone-of-voice.module';
import { TypographyDocModule } from './typography-doc/typography-doc.module';
import { UserFeedbackDocModule } from './user-feedback-doc/user-feedback-doc.module';
import { UtilitiesDocModule } from './utilities-doc/utilities-doc.module';

@NgModule({
  imports: [
    ColorDocModule,
    IconDocModule,
    TypographyDocModule,
    LogoDocModule,
    ToneOfVoiceModule,
    TheConceptModule,
    LayoutDocModule,
    NewProjectModule,
    GetStartedDesignersModule,
    TheDesignSystemDocModule,
    GetStartedDocModule,
    AccessibilityDocModule,
    UtilitiesDocModule,
    DesignProcessDocModule,
    UserFeedbackDocModule,
    PatternsDocModule,
    ContributeModule,
    FaqDocModule,
    ChangelogModule,
    ContactModule,
  ],
})
export class OtherPagesModule {}
