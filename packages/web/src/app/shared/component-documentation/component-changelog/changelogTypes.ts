import { ComponentChangelog } from 'src/app/doc-pages/components/component-data.interface';

// Extend the ComponentChangelog interface with a skipped property to be able to
// show changelog entries that have been skipped in the elvis changelog
export type ChangelogEntry = ComponentChangelog & { skipped?: number };
export type Changelog = ChangelogEntry[];
export type ChangelogRadioFilter = ComponentChangelog['changelog'][0]['type'] | 'all';
export type ChangelogLinks = { displayName: string; url: string }[];
