import { NgModule } from '@angular/core';
import { DevStartModule } from './dev-start/dev-start.module';
import { v2PlaygroundModule } from './v2-playground/v2-playground.module';


@NgModule({
    imports: [
        v2PlaygroundModule,
        DevStartModule
    ],
})
export class devModule { }
