import { Directive, HostBinding, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appDnd]',
})
export class DndDirective {
  // @ts-expect-error TS2564 (LEGO-3683)
  @HostBinding('class.e-fileupload---hover') fileOver: boolean;
  readonly fileDropped = output<unknown>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    alert('Files got dropped! Don´t worry, we do not store anything that you dropped here =)');
  }
}
