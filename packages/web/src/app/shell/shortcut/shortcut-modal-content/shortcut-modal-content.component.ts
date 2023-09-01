import { Component } from '@angular/core';

interface Shortcut {
  keys: string[];
  description: string;
}

@Component({
  selector: 'app-shortcut-modal-content',
  templateUrl: './shortcut-modal-content.component.html',
  styleUrls: ['./shortcut-modal-content.component.scss'],
})
export class ShortcutModalContentComponent {
  shortcuts: Shortcut[] = [
    {
      keys: ['g', 'a'],
      description: 'about',
    },
    {
      keys: ['g', 'b'],
      description: 'brand',
    },
    {
      keys: ['g', 'c'],
      description: 'components',
    },
    {
      keys: ['g', 'p'],
      description: 'patterns',
    },
    {
      keys: ['g', 't'],
      description: 'tools',
    },
    {
      keys: ['g', 'h'],
      description: 'homepage',
    },
    {
      keys: ['g', 's'],
      description: 'open search',
    },
  ];
}
