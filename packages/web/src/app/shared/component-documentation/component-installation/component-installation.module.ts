import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentInstallationComponent } from './component-installation.component';
import { CopyModule } from '../../copy/copy.module';

@NgModule({
    imports: [CommonModule, CopyModule, ComponentInstallationComponent],
    exports: [ComponentInstallationComponent],
})
export class ComponentInstallationModule {}
