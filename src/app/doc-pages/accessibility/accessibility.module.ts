import { NgModule } from '@angular/core';
import { AccessibilityStartModule } from './accessibility-start/accessibility-start.module';
import { AccessibilityDocModule } from './accessibility-doc/accessibility-doc.module';
import { AltTextModule } from './alt-text/alt-text.module';
import { OverviewAccessibilityModule } from './overview-accessibility/overview-accessibility.module';
import { UuToolsModule } from './uu-tools/uu-tools.module';


@NgModule({
    imports: [
        AccessibilityStartModule,
        AccessibilityDocModule,
        AltTextModule,
        OverviewAccessibilityModule,
        UuToolsModule
    ],
})
export class AccessibilityModule { }


