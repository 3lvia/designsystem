export type KeyCombination = [string, string];

interface ShortcutWithUrl {
  type: 'route';
  keys: KeyCombination;
  description: string;
  url: string;
}

interface ShortcutWithAction {
  type: 'action';
  keys: KeyCombination;
  description: string;
  action: () => void;
}

export type Shortcut = ShortcutWithUrl | ShortcutWithAction;

export const shortcuts: Shortcut[] = [
  { type: 'route', keys: ['g', 'a'], description: 'about', url: 'about' },
  { type: 'route', keys: ['g', 'b'], description: 'brand', url: 'brand' },
  { type: 'route', keys: ['g', 'c'], description: 'components', url: 'components' },
  { type: 'route', keys: ['g', 'd'], description: 'dev', url: 'dev' },
  { type: 'route', keys: ['g', 'p'], description: 'patterns', url: 'patterns' },
  { type: 'route', keys: ['g', 't'], description: 'tools', url: 'tools' },
  { type: 'route', keys: ['g', 'h'], description: 'homepage', url: '' },
  {
    type: 'action',
    keys: ['g', 's'],
    description: 'open search',
    action: () => {
      const searchButton = document.getElementById('search-button');
      searchButton?.click();
    },
  },
];
