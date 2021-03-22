import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentInstallationComponent } from './component-installation.component';
import { CopyModule } from '../../copy/copy.module';
import { ComponentExampleCodeModule } from '../component-example/component-example-code/component-example-code.module';

@NgModule({
  imports: [CommonModule, CopyModule, ComponentExampleCodeModule],
  declarations: [ComponentInstallationComponent],
  exports: [ComponentInstallationComponent],
})
export class ComponentInstallationModule {}
