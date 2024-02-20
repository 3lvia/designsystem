import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcutComponent } from './shortcut.component';
import { ShortcutModalContentComponent } from './shortcut-modal-content/shortcut-modal-content.component';

@NgModule({
    exports: [ShortcutComponent],
    imports: [CommonModule, ShortcutComponent, ShortcutModalContentComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShortcutModule {}
