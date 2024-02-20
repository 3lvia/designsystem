import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPropertiesComponent } from './component-properties.component';
import { CopyModule } from '../../copy/copy.module';

@NgModule({
    imports: [CommonModule, CopyModule, ComponentPropertiesComponent],
    exports: [ComponentPropertiesComponent],
})
export class ComponentPropertiesModule {}
