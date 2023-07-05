import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentEventListenerService {
  private shortcutWasTriggered = new Subject<void>();

  private keyboardPaths = {
    h: '',
    a: 'about',
    b: 'brand',
    c: 'components',
    p: 'patterns',
    t: 'tools',
    d: 'dev',
    s: '',
  };
  private lastGPress: number;
  constructor(private router: Router) {}

  /**
   * Handles navigating the page on keyboard events.
   *
   * If 'g' is pressed followed by the first letter of one of the main pages (e.g. About, Brand, Component, ...) the user is navigated to the corresponding page.
   * @param event
   */
  handleKeyboardEvent(event: KeyboardEvent): void {
    const body = document.getElementsByTagName('body')[0];
    const shortcutGlossary = (event.target as HTMLElement)?.closest('#elvia-shortcut-glossary-modal');

    if (!shortcutGlossary && event.target !== body) {
      return;
    }
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === 'g') {
      this.lastGPress = new Date().getTime();
    }
    if (this.keyPressIsInShortcuts(keyPressed)) {
      const now = new Date().getTime();
      if (now - this.lastGPress <= 1000) {
        if (keyPressed === 's') {
          const searchButton = document.getElementById('search-button');
          setTimeout(() => {
            searchButton?.click();
          });
        } else {
          this.router.navigate([this.keyboardPaths[keyPressed]]);
        }
        this.shortcutWasTriggered.next();
      }
    }
  }

  private keyPressIsInShortcuts(keyPressed: string): keyPressed is keyof typeof this.keyboardPaths {
    return keyPressed in this.keyboardPaths;
  }

  listenShortcutTriggered(): Observable<void> {
    return this.shortcutWasTriggered.asObservable();
  }
}
