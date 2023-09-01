import { Component, HostListener } from '@angular/core';
import { ShortcutService } from './shortcut.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
})
export class ShortcutComponent {
  showShortcutGlossary = false;
  showShortcutGlossaryButton = false;
  private shortcutGlossaryTimeoutId: number | undefined;
  private shortcutGlossaryButtonTimeoutId: number | undefined;

  constructor(private shortcutService: ShortcutService) {
    fromEvent(document, 'keypress')
      .pipe(
        takeUntilDestroyed(),
        filter((e): e is KeyboardEvent => e instanceof KeyboardEvent),
      )
      .subscribe((event: KeyboardEvent) => {
        this.shortcutService.handleKeyboardEvent(event);
      });

    this.shortcutService
      .listenShortcutTriggered()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.closeShortcutGlossary();
        this.hideShortcutGlossaryButton();
        clearTimeout(this.shortcutGlossaryTimeoutId);
        clearTimeout(this.shortcutGlossaryButtonTimeoutId);
      });
  }

  openShortcutGlossary = (): void => {
    this.showShortcutGlossary = true;
  };

  closeShortcutGlossary = (): void => {
    this.showShortcutGlossary = false;
  };

  hideShortcutGlossaryButton = (): void => {
    this.showShortcutGlossaryButton = false;
  };

  @HostListener('window:keypress', ['$event'])
  handleShortcutGlossary = (event: KeyboardEvent): void => {
    const shortcutGlossary = (event.target as HTMLElement)?.closest('#elvia-shortcut-glossary-modal');

    if (!shortcutGlossary && event.target !== document.body) {
      return;
    }

    if (event.key.toLowerCase() === 'g') {
      if (!this.showShortcutGlossary) {
        this.shortcutGlossaryTimeoutId = window.setTimeout(this.openShortcutGlossary, 250);
      }
    } else {
      clearTimeout(this.shortcutGlossaryTimeoutId);
    }
  };

  @HostListener('window:keydown.tab', ['$event'])
  handleShortcutGlossaryButton = (): void => {
    if (this.showShortcutGlossary) {
      return;
    }
    clearTimeout(this.shortcutGlossaryButtonTimeoutId);
    this.showShortcutGlossaryButton = true;
    this.shortcutGlossaryButtonTimeoutId = window.setTimeout(this.hideShortcutGlossaryButton, 7000);
  };
}
