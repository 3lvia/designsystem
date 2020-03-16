import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyDocComponent } from './typography-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { SmartphoneModule } from 'src/app/shared/smartphone/smartphone.module';
import { IframePreviewModule } from 'src/app/shared/iframe-preview/iframe-preview.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CopyModule,
    SmartphoneModule,
    IframePreviewModule
  ],
  declarations: [TypographyDocComponent]
})
export class TypographyDocModule { }
