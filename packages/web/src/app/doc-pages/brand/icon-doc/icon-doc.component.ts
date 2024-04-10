import { NgClass } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
// @ts-ignore
import * as icons from '@elvia/elvis-assets-icons/config/icons.config.js';
import naturalCompare from 'natural-compare-lite';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { CodeViewerComponent } from '../../../shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentChangelogComponent } from '../../../shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentInstallationComponent } from '../../../shared/component-documentation/component-installation/component-installation.component';
import { ComponentPropertiesTableComponent } from '../../../shared/component-documentation/component-properties-table/component-properties-table.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { CopyComponent } from '../../../shared/copy/copy.component';
import { IconCegComponent } from './icon-ceg/icon-ceg.component';
import { IconColorsCegComponent } from './icon-colors-ceg/icon-colors-ceg.component';
import { elvisIconData } from './icon-data';
import { IconPreviewFilterComponent } from './icon-preview-filter/icon-preview-filter.component';
import { IconSearchPipe } from './icon-search.pipe';
import { IconSizesCegComponent } from './icon-sizes-ceg/icon-sizes-ceg.component';
import { Icon } from './icon.interface';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { Theme } from 'src/app/core/services/theme.service';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

type IconArray = { pretty: string; title: string; terms: string[] }[];

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    NgClass,
    ComponentSubsectionComponent,
    FormsModule,
    RouterLink,
    CopyComponent,
    ComponentSectionComponent,
    StaticCegComponent,
    IconSizesCegComponent,
    IconColorsCegComponent,
    ComponentSubsubsectionComponent,
    CodeViewerComponent,
    CegComponent,
    IconCegComponent,
    ComponentInstallationComponent,
    ComponentPropertiesTableComponent,
    ComponentChangelogComponent,
    IconSearchPipe,
    IconPreviewFilterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconDocComponent implements OnInit {
  @ViewChild('accordionIconsDesktop') accordionIconsDesktop: ElementRef;
  @ViewChild('accordionIconsMobile') accordionIconsMobile: ElementRef;
  @ViewChild('icons') icons: ElementRef;
  @Output() clickOutside = new EventEmitter();

  componentData = elvisIconData;
  noSubs = true;

  visibleIcons: IconArray = [];
  private allIcons: IconArray = [];
  figmaUrl = getDocPagesNotFromCMS('icon')?.figmaUrl;
  description = getDocPagesNotFromCMS('icon')?.description;
  descriptionNo = getDocPagesNotFromCMS('icon')?.descriptionNo;
  title = getDocPagesNotFromCMS('icon')?.title;
  titleNo = getDocPagesNotFromCMS('icon')?.titleNo;
  private latestIcon = '';
  copied = false;
  locale: Locale = 'en-GB';

  scriptCodeHTML = `<script src="path_to_file/elvis.js"></script>`;
  iconExample = `<i class="e-icon e-icon--chat e-icon--md" aria-hidden="true"></i>`;

  term = '';
  IconClassList: Icon[] = [];
  iconPreviewTheme: Theme = 'light';

  constructor(
    private titleService: Title,
    private localizationService: LocalizationService,
  ) {
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale;
        this.setTabTitle();
      });
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(_event: MouseEvent, targetElement: HTMLElement): void {
    const alert = document.getElementById(this.latestIcon);
    const iconContainer = document.getElementById(this.latestIcon + '_container');
    if (!alert && !iconContainer) {
      return;
    }
    const alertClick = alert?.contains(targetElement);
    const iconContainerClick = iconContainer?.contains(targetElement);
    if (!alertClick && !iconContainerClick) {
      this.closeLastAlert(this.latestIcon);
    }
  }

  ngOnInit(): void {
    this.setTabTitle();
    this.fillIconList();
    this.visibleIcons = this.allIcons;
  }

  private setTabTitle = (): void => {
    this.titleService.setTitle(
      (this.locale === 'nb-NO' && this.titleNo ? this.titleNo : this.title) + ' | Elvia design system',
    );
  };

  private getShortIconName(iconName: string): string {
    const short = iconName.split(/[-_]/).join(' ');
    return short.charAt(0).toUpperCase() + short.slice(1);
  }

  private fillIconList(): void {
    this.allIcons = [];

    for (const icon of icons) {
      if (icon.name.indexOf('figma') > -1) {
        continue;
      }
      if (!icon.deprecated) {
        this.allIcons.push({
          pretty: this.getShortIconName(icon.name),
          title: icon.name,
          terms: icon.terms,
        });
      }
    }

    this.allIcons.sort((icon, icon2) => {
      const a = icon.pretty.toLowerCase();
      const b = icon2.pretty.toLowerCase();
      return naturalCompare(a, b);
    });
  }

  selectFilter(filter: string): void {
    if (filter === 'all') {
      this.visibleIcons = this.allIcons;
    }
    if (filter === 'outline') {
      this.visibleIcons = this.allIcons.filter((icon) => {
        return !icon.title.includes('-filled') && !icon.title.includes('-color');
      });
    }
    if (filter === 'filled') {
      this.visibleIcons = this.allIcons.filter((icon) => {
        return icon.title.includes('-filled');
      });
    }
    if (filter === 'colored') {
      this.visibleIcons = this.allIcons.filter((icon) => {
        return icon.title.includes('-color');
      });
    }
  }

  openCopyAlert(iconTitle: string): void {
    this.closeLastAlert(this.latestIcon);

    const elementContainer = document.getElementById(iconTitle + '_container');
    elementContainer?.classList.add('selected');
    const element = document.getElementById(iconTitle);
    element?.classList.remove('e-none');
    this.latestIcon = iconTitle;
  }

  private closeLastAlert(itemId: string): void {
    this.copied = false;
    if (this.latestIcon !== '') {
      const lastElementContainer = document.getElementById(itemId + '_container');
      if (lastElementContainer) {
        lastElementContainer.classList.remove('selected');
      }

      const element = document.getElementById(itemId);
      if (element) {
        element.classList.add('e-none');
      }
    }
  }

  copyIconClass(iconTitle: string): void {
    this.copied = true;
    const iconClass = 'e-icon e-icon--' + iconTitle + ' e-icon--sm';
    navigator.clipboard.writeText(iconClass);
  }
}
