import { NgModule } from '@angular/core';
import { GetStartedStartModule } from './get-started-start/get-started-start.module';
import { OverviewGetStartedModule } from './overview-get-started/overview-get-started.module';
import { NewProjectModule } from './new-project/new-project.module';


@NgModule({
    imports: [
        GetStartedStartModule,
        OverviewGetStartedModule,
        NewProjectModule,
    ],
})
export class GetStartedModule { }
