import { Component, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Shortcut, shortcuts } from './keys';
import { Observable, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
})
export class ShortcutComponent {
  showShortcutGlossary = false;
  showShortcutGlossaryButton = false;
  private lastTriggerTimestamp: number;
  private shortcutGlossaryTimeoutId: number | undefined;
  private shortcutGlossaryButtonTimeoutId: number | undefined;
  private shortcuts = shortcuts;

  constructor(router: Router) {
    this.listenForShortcut(this.shortcuts).subscribe((triggeredShortcut) => {
      this.closeShortcutGlossary();
      this.hideShortcutGlossaryButton();
      clearTimeout(this.shortcutGlossaryTimeoutId);
      clearTimeout(this.shortcutGlossaryButtonTimeoutId);

      if (triggeredShortcut.type === 'action') {
        triggeredShortcut.action();
      } else {
        router.navigate([triggeredShortcut.url]);
      }
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

  private listenForShortcut(shortcuts: Shortcut[]): Observable<Shortcut> {
    const triggeringKeys = new Set(shortcuts.map((s) => s.shortcut[0]));

    return fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      takeUntilDestroyed(),
      filter((event) => !(event.target instanceof HTMLInputElement)),
      map((event) => event.key),
      tap((key) => {
        if (triggeringKeys.has(key)) {
          this.lastTriggerTimestamp = Date.now();
        }
      }),
      map((key) => {
        return shortcuts.find((s) => s.shortcut[1] === key);
      }),
      filter((shortcut): shortcut is Shortcut => {
        const now = new Date().getTime();
        return !!shortcut && now - this.lastTriggerTimestamp <= 1000;
      }),
    );
  }
}
