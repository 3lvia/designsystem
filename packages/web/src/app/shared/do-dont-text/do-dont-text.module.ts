import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoDontTextComponent } from './do-dont-text.component';

@NgModule({
    imports: [CommonModule, DoDontTextComponent],
    exports: [DoDontTextComponent],
})
export class DoDontTextModule {}
