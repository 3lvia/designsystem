import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyComponent } from './copy.component';
import '@elvia/elvis-tooltip';

@NgModule({
    imports: [CommonModule, CopyComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [CopyComponent],
})
export class CopyModule {}
