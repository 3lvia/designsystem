import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemStatus } from './../item-status.enum';
import { NavbarAnchor } from '../navbarAnchor.interface';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss'],
})
export class ComponentHeaderComponent {
  @Input() componentStatus = '';
  @Input() tabs: string[];
  @Input() does = [];
  @Input() donts = [];
  @Input() selected: string;
  @Input() figmaUrl: string;
  @Output() selectedChange = new EventEmitter();

  itemStatus = ItemStatus;
  navbarAnchors: NavbarAnchor[] = [];
  activeAnchor: NavbarAnchor;

  constructor(private scrollService: ScrollService) {
    this.scrollService.listenAnchorAtCurrPos().subscribe((anchor: NavbarAnchor) => {
      this.activeAnchor = anchor;
    });
    this.scrollService.listenAnchors().subscribe((anchors: NavbarAnchor[]) => {
      this.navbarAnchors = anchors;
      this.activeAnchor = this.navbarAnchors[0];
    });
  }

  scrollToElement(anchor: NavbarAnchor): void {
    this.activeAnchor = anchor;
    this.scrollService.newAnchorToScrollTo(anchor);
  }

  isActive(anchor: NavbarAnchor): boolean {
    return anchor === this.activeAnchor;
  }

  chooseTab(tab: string): void {
    this.selected = tab;
    this.selectedChange.emit(this.selected);
  }
}
