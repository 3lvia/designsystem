import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss'],
})
export class ComponentHeaderComponent implements AfterViewInit {
  @ViewChild('contentWrapper') content: ElementRef;

  @Input() componentStatus = '';
  @Input() figmaUrl?: string;
  @Input() figmaOnly = false;
  @Input() lastUpdated?: string;
  @Input() componentData?: ComponentData;
  @Output() selectedChange = new EventEmitter();

  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url.substring(1);
    this.currentRoute = this.currentRoute.substring(0, this.currentRoute.indexOf('/'));
  }

  ngAfterViewInit(): void {
    this.getNewInnerHTML();
  }

  private decodeHTML(txt: string): string {
    txt = txt.replace(/&lt;/g, '<');
    txt = txt.replace(/&gt;/g, '>');
    return txt;
  }

  private createHTMLElement(txt: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = txt;
    return div;
  }

  private getNewInnerHTML(): void {
    const element = this.content.nativeElement;
    // Not necessary to replace content with decoded HTML if it does not contain any encoded HTML
    if (element.innerHTML.indexOf('&lt;') > -1) {
      const newInner = this.decodeHTML(element.innerHTML);
      element.innerHTML = '';
      element.appendChild(this.createHTMLElement(newInner));
    }
  }
}
