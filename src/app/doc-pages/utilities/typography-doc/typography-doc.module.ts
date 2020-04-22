import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyDocComponent } from './typography-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { IframeScreenModule } from 'src/app/shared/iframe-screen/iframe-screen.module';
import { IframePreviewModule } from 'src/app/shared/iframe-preview/iframe-preview.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CopyModule,
    IframeScreenModule,
    IframePreviewModule
  ],
  declarations: [TypographyDocComponent]
})
export class TypographyDocModule { }
