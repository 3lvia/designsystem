import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteDocComponent } from './autocomplete-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-properties/component-properties.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CodeHighlighterModule,
    ComponentPropertiesModule,
  ],
  declarations: [AutocompleteDocComponent],
})
export class AutocompleteDocModule { }
