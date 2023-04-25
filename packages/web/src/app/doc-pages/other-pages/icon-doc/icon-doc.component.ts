import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { Icon } from './icon.interface';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
// @ts-ignore
import * as icons from '@elvia/elvis-assets-icons/config/icons.config.js';
import { elvisIconData } from './icon-data';
import { Title } from '@angular/platform-browser';
import naturalCompare from 'natural-compare-lite';
import { Subscription } from 'rxjs';
import { LOCALE_CODE } from 'contentful/types';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';

type IconArray = { pretty: string; title: string; terms: string[] }[];

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
})
export class IconDocComponent implements OnInit, OnDestroy {
  @ViewChild('accordionIconsDesktop') accordionIconsDesktop: ElementRef;
  @ViewChild('accordionIconsMobile') accordionIconsMobile: ElementRef;
  @ViewChild('icons') icons: ElementRef;
  @Output() clickOutside = new EventEmitter();

  localizationSubscriber: Subscription;
  componentData = elvisIconData;
  noSubs = true;

  visibleIcons: IconArray = [];
  allIcons: IconArray = [];
  outlinedIcons: IconArray = [];
  filledIcons: IconArray = [];
  twoColoredIcons: IconArray = [];
  figmaUrl = getDocPagesNotFromCMS('icon')?.figmaUrl;
  description = getDocPagesNotFromCMS('icon')?.description;
  descriptionNo = getDocPagesNotFromCMS('icon')?.descriptionNo;
  title = getDocPagesNotFromCMS('icon')?.title;
  titleNo = getDocPagesNotFromCMS('icon')?.titleNo;
  inverted = false;
  selected = 'all';
  latestIcon = '';
  copied = false;
  locale: LOCALE_CODE = 'en-GB';

  iconColorClassExample = `<h5>Default colors</h5>
<i class="e-icon e-icon--chat e-icon--color-default e-mr-40" aria-hidden="true"></i>
<h5>Disabled colors</h5>
<i class="e-icon e-icon--chat e-icon--color-disabled e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--chat e-icon--color-disabled-light e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--chat e-icon--color-placeholder e-mr-40" aria-hidden="true"></i>
<h5>Signal colors</h5>
<i class="e-icon e-icon--check_circle e-icon--color-on e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--warning_circle e-icon--color-warning e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--remove_circle e-icon--color-error e-mr-40" aria-hidden="true"></i>
<h5>Static colors</h5>
<i class="e-icon e-icon--chat e-icon--color-black e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--chat e-icon--color-white e-mr-40" aria-hidden="true"></i>`;

  example = `<i class="e-icon e-icon--move_truck-color e-icon--xxs e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xs e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--sm e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--md e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--lg e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xl e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xxl" aria-hidden="true"></i>
`;
  exampleInverted = `<i class="e-icon e-icon--move_truck-color e-icon--xxs e-icon--inverted e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xs e-icon--inverted e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--sm e-icon--inverted e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--md e-icon--inverted e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--lg e-icon--inverted e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xl e-icon--inverted e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xxl e-icon--inverted" aria-hidden="true"></i>
`;

  example2 = `<i class="e-icon e-icon--remove_circle e-icon--color-red e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--warning_circle e-icon--color-orange e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--check_circle e-icon--color-green e-mr-40" aria-hidden="true"></i>
`;

  example3 = `<i class="e-icon e-icon--chat e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--chat e-icon--color-disabled" aria-hidden="true"></i>
`;
  example3Inverted = `<i class="e-icon e-icon--chat e-icon--inverted e-mr-40" aria-hidden="true"></i>
<i class="e-icon e-icon--chat e-icon--inverted-disabled-grey-70" aria-hidden="true"></i>
`;

  importCodeTS = `import { addCircle } from '@elvia/elvis-assets-icons/icons'`;
  scriptCodeHTML = `<script src="path_to_file/elvis.js"></script>;`;
  iconExample = `<i class="e-icon e-icon--chat e-icon--md" aria-hidden="true"></i>`;

  term = '';
  IconClassList: Icon[] = [];

  constructor(private titleService: Title, private localizationService: LocalizationService) {
    this.setTabTitle();
    this.localizationSubscriber = this.localizationService.listenLocalization().subscribe((locale) => {
      this.locale = locale === Locale['en-GB'] ? 'en-GB' : 'nb-NO';
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
    this.fillIconList();
    this.setOutlineIcons();
    this.setFilledIcons();
    this.setTwoColoredIcons();
    this.visibleIcons = this.allIcons;
  }

  ngOnDestroy(): void {
    this.localizationSubscriber && this.localizationSubscriber.unsubscribe();
  }

  setTabTitle = (): void => {
    this.titleService.setTitle(
      (this.locale === 'nb-NO' && this.titleNo ? this.titleNo : this.title) + ' | Elvia design system',
    );
  };

  invert(): void {
    this.inverted = !this.inverted;
  }

  removeSearch(): void {
    this.term = '';
  }

  getShortIconName(iconName: string): string {
    const short = iconName.split(/[-_]/).join(' ');
    return short.charAt(0).toUpperCase() + short.slice(1);
  }

  fillIconList(): void {
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
      const a = icon.title.toLowerCase();
      const b = icon2.title.toLowerCase();
      return naturalCompare(a, b);
    });
  }

  setOutlineIcons(): void {
    this.outlinedIcons = this.allIcons.filter((icon) => {
      return !icon.title.includes('-filled') && !icon.title.includes('-color');
    });
  }
  setFilledIcons(): void {
    this.filledIcons = this.allIcons.filter((icon) => {
      return icon.title.includes('-filled');
    });
  }
  setTwoColoredIcons(): void {
    this.twoColoredIcons = this.allIcons.filter((icon) => {
      return icon.title.includes('-color');
    });
  }

  selectFilter(filter: string): void {
    this.selected = filter;
    if (filter === 'all') {
      this.visibleIcons = this.allIcons;
    }
    if (filter === 'outline') {
      this.visibleIcons = this.outlinedIcons;
    }
    if (filter === 'filled') {
      this.visibleIcons = this.filledIcons;
    }
    if (filter === 'colored') {
      this.visibleIcons = this.twoColoredIcons;
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

  closeLastAlert(itemId: string): void {
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
