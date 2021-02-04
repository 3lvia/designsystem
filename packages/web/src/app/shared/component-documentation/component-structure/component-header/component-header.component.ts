import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ItemStatus } from '../../../item-status.enum';
import { NavbarAnchor } from '../../../navbarAnchor.interface';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss'],
})
export class ComponentHeaderComponent implements AfterViewInit {
  @ViewChild('contentWrapper') content: ElementRef;

  @Input() componentStatus = '';
  @Input() figmaUrl: string;
  @Output() selectedChange = new EventEmitter();

  itemStatus = ItemStatus;
  navbarAnchors: NavbarAnchor[] = [];
  activeAnchor: NavbarAnchor;
  currentRoute: string;
  backBtn: string;

  constructor(private scrollService: ScrollService, private router: Router) {
    this.currentRoute = this.router.url.substring(1);
    this.currentRoute = this.currentRoute.substring(0, this.currentRoute.indexOf('/'));
    this.backBtn = this.currentRoute.replace('-', ' ');

    this.scrollService.listenAnchorAtCurrPos().subscribe((anchor: NavbarAnchor) => {
      this.activeAnchor = anchor;
    });
    this.scrollService.listenAnchors().subscribe((anchors: NavbarAnchor[]) => {
      this.navbarAnchors = anchors;
      this.activeAnchor = this.navbarAnchors[0];
    });
  }

  ngAfterViewInit(): void {
    this.getNewInnerHTML();
  }

  scrollToElement(anchor: NavbarAnchor): void {
    this.activeAnchor = anchor;
    this.scrollService.newAnchorToScrollTo(anchor);
  }

  isActive(anchor: NavbarAnchor): boolean {
    return anchor === this.activeAnchor;
  }

  decodeHTML(txt: string): string {
    txt = txt.replace(/&lt;/g, '<');
    txt = txt.replace(/&gt;/g, '>');
    return txt;
  }

  createHTMLElement(txt: string): any {
    const div = document.createElement('div');
    div.innerHTML = txt;
    return div;
  }

  getNewInnerHTML(): void {
    const element = this.content.nativeElement;
    const newInner = this.decodeHTML(element.innerHTML);
    element.innerHTML = '';
    element.appendChild(this.createHTMLElement(newInner));
  }
}
