import { NgModule } from '@angular/core';
import { ToolsStartModule } from './tools-start/tools-start.module';
import { AccessibilityDocModule } from './accessibility-doc/accessibility-doc.module';
import { OverviewToolsModule } from './overview-tools/overview-tools.module';
import { GetStartedModule } from '../get-started/get-started.module';
import { UtilitiesDocModule } from './utilities-doc/utilities-doc.module';
import { DesignProcessDocModule } from './design-process-doc/design-process-doc.module';
import { UserFeedbackDocModule } from './user-feedback-doc/user-feedback-doc.module';
import { PatternsDocModule } from './patterns-doc/patterns-doc.module';

@NgModule({
  imports: [
    ToolsStartModule,
    AccessibilityDocModule,
    OverviewToolsModule,
    GetStartedModule,
    UtilitiesDocModule,
    DesignProcessDocModule,
    UserFeedbackDocModule,
    PatternsDocModule,
  ],
})
export class ToolsModule {}
