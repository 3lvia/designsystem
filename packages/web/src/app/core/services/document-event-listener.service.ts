import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ThemeService } from './theme.service';
import { ThemeName } from '@elvia/elvis-colors';

@Injectable({
  providedIn: 'root',
})
export class DocumentEventListenerService {
  private shortcutWasTriggered = new Subject<void>();

  private goKeyboardPaths = {
    h: '',
    a: 'about',
    b: 'brand',
    c: 'components',
    p: 'patterns',
    t: 'tools',
    d: 'dev',
    s: '',
  };
  private switchKeyboardPaths = {
    t: '',
  };
  private lastGPress: number;
  private lastSPress: number;
  private currentTheme: ThemeName;
  constructor(private router: Router, private themeService: ThemeService) {
    themeService.listenTheme().subscribe((theme) => (this.currentTheme = theme));
  }

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
    if (keyPressed === 's') {
      this.lastSPress = new Date().getTime();
    }
    if (this.keyPressIsInSwitchShortcuts(keyPressed)) {
      if (keyPressed === 't') {
        this.themeService.setPreferredTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
      }
    }
    if (this.keyPressIsInGoShortcuts(keyPressed)) {
      const now = new Date().getTime();
      if (now - this.lastGPress <= 1000) {
        if (keyPressed === 's') {
          const searchButton = document.getElementById('search-button');
          setTimeout(() => {
            searchButton?.click();
          });
        } else {
          this.router.navigate([this.goKeyboardPaths[keyPressed]]);
        }
        this.shortcutWasTriggered.next();
      }
    }
  }

  private keyPressIsInGoShortcuts(keyPressed: string): keyPressed is keyof typeof this.goKeyboardPaths {
    return keyPressed in this.goKeyboardPaths;
  }

  private keyPressIsInSwitchShortcuts(
    keyPressed: string,
  ): keyPressed is keyof typeof this.switchKeyboardPaths {
    return keyPressed in this.switchKeyboardPaths;
  }

  listenShortcutTriggered(): Observable<void> {
    return this.shortcutWasTriggered.asObservable();
  }
}
