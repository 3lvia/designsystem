import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule, ErrorComponent],
})
export class ErrorModule {}
