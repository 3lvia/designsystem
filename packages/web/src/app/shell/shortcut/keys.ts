export type KeyCombination = [string, string];

interface ShortcutWithUrl {
  type: 'route';
  shortcut: KeyCombination;
  description: string;
  url: string;
}

interface ShortcutWithAction {
  type: 'action';
  shortcut: KeyCombination;
  description: string;
  action: () => void;
}

export type Shortcut = ShortcutWithUrl | ShortcutWithAction;

export const shortcuts: Shortcut[] = [
  { type: 'route', shortcut: ['g', 'a'], description: 'about', url: 'about' },
  { type: 'route', shortcut: ['g', 'b'], description: 'brand', url: 'brand' },
  { type: 'route', shortcut: ['g', 'c'], description: 'components', url: 'components' },
  { type: 'route', shortcut: ['g', 'd'], description: 'dev', url: 'dev' },
  { type: 'route', shortcut: ['g', 'p'], description: 'patterns', url: 'patterns' },
  { type: 'route', shortcut: ['g', 't'], description: 'tools', url: 'tools' },
  { type: 'route', shortcut: ['g', 'h'], description: 'homepage', url: '' },
  {
    type: 'action',
    shortcut: ['g', 's'],
    description: 'open search',
    action: () => {
      const searchButton = document.getElementById('search-button');
      searchButton?.click();
    },
  },
];
