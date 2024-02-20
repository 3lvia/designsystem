import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentChangelogComponent } from './component-changelog/component-changelog.component';



import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';





import { CegModule } from './ceg/ceg.module';
import { RouterModule } from '@angular/router';
import { ComponentDocumentationComponent } from './component-documentation.component';



/**
 * A shared module that includes CommonModule and all modules needed for a Elvis component documentation page.
 * @see {@link https://angular.io/guide/sharing-ngmodules}
 */
@NgModule({
    imports: [
    CommonModule,
    RouterModule,
    ComponentChangelogComponent,
    ComponentPropertiesTableModule,
    ComponentDocumentationComponent,
],
    exports: [
    ComponentDocumentationComponent,
    CommonModule,
    RouterModule,
    ComponentChangelogComponent,
    ComponentPropertiesTableModule,
    CegModule,
],
})
export class SharedDocumentationModule {}
