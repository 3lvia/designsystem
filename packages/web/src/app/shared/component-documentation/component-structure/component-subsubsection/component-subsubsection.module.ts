import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSubsubsectionComponent } from './component-subsubsection.component';

@NgModule({
    imports: [CommonModule, ComponentSubsubsectionComponent],
    exports: [ComponentSubsubsectionComponent],
})
export class ComponentSubsubsectionModule {}
