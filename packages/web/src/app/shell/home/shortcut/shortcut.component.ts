import { Component } from '@angular/core';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
})
export class ShortcutComponent {
  shortcuts = [
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
