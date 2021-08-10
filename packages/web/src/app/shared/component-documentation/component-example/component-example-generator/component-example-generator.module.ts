import { Compiler, CompilerFactory, COMPILER_OPTIONS, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleGeneratorComponent } from './component-example-generator.component';
import { ComponentExampleCodeModule } from '../component-example-code/component-example-code.module';
import { ComponentExampleAccordionModule } from '../component-example-accordion/component-example-accordion.module';
import { CegFiltersModule } from './ceg-filters/ceg-filters.module';
import '@elvia/elvis-dropdown';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
export function createCompiler(compilerFactory: CompilerFactory): Compiler {
  return compilerFactory.createCompiler();
}
@NgModule({
  imports: [CommonModule, ComponentExampleCodeModule, ComponentExampleAccordionModule, CegFiltersModule],
  declarations: [ComponentExampleGeneratorComponent],
  exports: [ComponentExampleGeneratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ],
})
export class ComponentExampleGeneratorModule { }
