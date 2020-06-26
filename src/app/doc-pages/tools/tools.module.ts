import { NgModule } from '@angular/core';
import { ToolsStartModule } from './tools-start/tools-start.module';
import { AccessibilityDocModule } from './accessibility-doc/accessibility-doc.module';
import { AltTextModule } from './alt-text/alt-text.module';
import { OverviewToolsModule } from './overview-tools/overview-tools.module';
import { UuToolsModule } from './uu-tools/uu-tools.module';
import { GetStartedModule } from '../get-started/get-started.module';


@NgModule({
    imports: [
        ToolsStartModule,
        AccessibilityDocModule,
        AltTextModule,
        OverviewToolsModule,
        UuToolsModule,
        GetStartedModule,
    ],
})
export class ToolsModule { }


