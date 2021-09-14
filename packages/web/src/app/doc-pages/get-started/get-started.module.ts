import { NgModule } from '@angular/core';
import { GetStartedStartModule } from './get-started-start/get-started-start.module';
import { OverviewGetStartedModule } from './overview-get-started/overview-get-started.module';
import { NewProjectModule } from './new-project/new-project.module';
import { GetStartedDesignersModule } from './get-started-designers/get-started-designers.module';
import { TheDesignSystemDocModule } from './the-design-system-doc/the-design-system-doc.module';
import { GetStartedDocModule } from './get-started-doc/get-started-doc.module';

@NgModule({
  imports: [
    GetStartedStartModule,
    OverviewGetStartedModule,
    NewProjectModule,
    GetStartedDesignersModule,
    TheDesignSystemDocModule,
    GetStartedDocModule
  ],
})
export class GetStartedModule { }
