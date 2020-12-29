import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { Icon } from 'src/app/shared/icon.interface';
import { getIdentity } from 'src/app/shared/e-items';
import * as icons from '@elvia/elvis/src/config/icons.config';
import { CopyToClipboardService } from 'src/app/core/services/copy-to-clipboard.service';

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
})
export class IconDocComponent implements OnInit {

  @ViewChild('accordionIconsDesktop') accordionIconsDesktop: ElementRef;
  @ViewChild('accordionIconsMobile') accordionIconsMobile: ElementRef;
  @ViewChild('icons') icons: ElementRef;

  @Output() clickOutside: EventEmitter<any> = new EventEmitter();

  visibleIcons = [];
  allIcons = [];
  outlinedIcons = [];
  filledIcons = [];
  twoColoredIcons = [];
  figmaUrl = getIdentity('icon').figmaUrl;
  description = getIdentity('icon').description;
  inverted = false;
  selected = 'all';
  latestIcon = '';
  copied = false;

  example = `<i class="e-icon e-icon--move_truck-color e-icon--xxs e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xs e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--sm e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--md e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--lg e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xl e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xxl"></i>
`;

  example2 = `<i class="e-icon e-icon--cog e-icon--color-red-tomato e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-orange-mango e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-green-apple e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-blue-berry e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-purple-plum e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-violet-grape e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-grey e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-grey-70"></i>
`;

  example3 = `<i class="e-icon e-icon--chat e-mr-40"></i>
<i class="e-icon e-icon--chat e-icon--color-disabled"></i>
`;
  example3Inverted = `<i class="e-icon e-icon--chat e-icon--inverted e-mr-40"></i>
<i class="e-icon e-icon--chat e-icon--color-disabled e-icon--inverted"></i>
`;


  importCodeTS = `import { addCircle } from '@elvia/elvis/icons'`;
  scriptCodeHTML = `<script src="path_to_file/elvis.js"></script>;`;
  iconExample = `<i class="e-icon e-icon--chat e-icon--md"></i>`;

  term = '';
  IconClassList: Icon[] = [];

  constructor(private copyService: CopyToClipboardService) { }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    const alert = document.getElementById(this.latestIcon);
    const iconContainer = document.getElementById(this.latestIcon + '_container');
    if (!alert && !iconContainer) {
      return;
    }
    const alertClick = alert.contains(targetElement);
    const iconContainerClick = iconContainer.contains(targetElement);
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

  invert(): void {
    this.inverted = !this.inverted;
  }

  removeSearch(): void {
    this.term = '';
  }

  getShortIconName(iconName: string): string {
    let short = iconName.split('-').join(' ');
    short = short.split('_').join(' ');
    return short.charAt(0).toUpperCase() + short.slice(1);
  }

  fillIconList(): void {
    this.allIcons = [];

    for (const icon of icons) {
      if (icon.name.indexOf('figma') > -1) {
        continue;
      }
      if (icon.deprecated !== true) {
        this.allIcons.push({
          pretty: this.getShortIconName(icon.name),
          title: icon.name,
          terms: icon.terms,
        });
      }
    }

    this.allIcons.sort((icon: any, icon2: any) => {
      const a = icon.title.toLowerCase();
      const b = icon2.title.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  setOutlineIcons(): void {
    this.outlinedIcons = this.allIcons.filter(icon => {
      return !icon.title.includes('-filled') && !icon.title.includes('-color');
    });
  }
  setFilledIcons(): void {
    this.filledIcons = this.allIcons.filter(icon => {
      return icon.title.includes('-filled');
    });
  }
  setTwoColoredIcons(): void {
    this.twoColoredIcons = this.allIcons.filter(icon => {
      return icon.title.includes('-color');
    });
  }

  toggleOpenDesktop(): void {
    if (this.icons.nativeElement.classList.contains('open-accordion')) {
      this.icons.nativeElement.classList.remove('open-accordion');
    } else {
      this.icons.nativeElement.classList.add('open-accordion');
    }
    if (this.accordionIconsDesktop.nativeElement.classList.contains('e-accordion__item--open')) {
      this.accordionIconsDesktop.nativeElement.classList.remove('e-accordion__item--open');
    } else {
      this.accordionIconsDesktop.nativeElement.classList.add('e-accordion__item--open');
    }
  }
  toggleOpenMobile(): void {
    if (this.icons.nativeElement.classList.contains('open-accordion')) {
      this.icons.nativeElement.classList.remove('open-accordion');
    } else {
      this.icons.nativeElement.classList.add('open-accordion');
    }
    if (this.accordionIconsMobile.nativeElement.classList.contains('e-accordion__item--open')) {
      this.accordionIconsMobile.nativeElement.classList.remove('e-accordion__item--open');
    } else {
      this.accordionIconsMobile.nativeElement.classList.add('e-accordion__item--open');
    }
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
    elementContainer.classList.add('selected');
    const element = document.getElementById(iconTitle);
    element.classList.remove('e-none');
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
    this.copyService.copyToClipBoard(iconClass);
  }
}
