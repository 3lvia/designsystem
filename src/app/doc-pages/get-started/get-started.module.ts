import { NgModule } from '@angular/core';
import { GetStartedStartModule } from './get-started-start/get-started-start.module';
import { OverviewGetStartedModule } from './overview-get-started/overview-get-started.module';
import { NewProjectModule } from './new-project/new-project.module';
import { GetStartedDesignersModule } from './get-started-designers/get-started-designers.module';


@NgModule({
    imports: [
        GetStartedStartModule,
        OverviewGetStartedModule,
        NewProjectModule,
        GetStartedDesignersModule,
    ],
})
export class GetStartedModule { }
