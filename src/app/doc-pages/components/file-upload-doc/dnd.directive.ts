import {
    Directive,
    Output,
    Input,
    EventEmitter,
    HostBinding,
    HostListener
} from '@angular/core';

@Directive({
    selector: '[appDnd]'
})
export class DndDirective {
    @HostBinding('class.e-fileupload---hover') fileOver: boolean;
    @Output() fileDropped = new EventEmitter<any>();

    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = true;
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
        alert('Files got dropped! Don´t worry, we do not store anything that you dropped here =)');
    }
}
