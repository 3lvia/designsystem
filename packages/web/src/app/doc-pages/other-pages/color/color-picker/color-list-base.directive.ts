import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appColorListBase]',
})
export class ColorListBaseDirective {
  @HostBinding('class.overflow-right') showGradient = true;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('scroll')
  onScroll() {
    const scrollLeft = this.elementRef.nativeElement.scrollLeft;
    const element = this.elementRef.nativeElement;

    const hasScroll = element.clientWidth < element.scrollWidth;
    const scrollRight = element.scrollWidth - (element.clientWidth + scrollLeft);

    this.showGradient = hasScroll && scrollRight > 20;
  }
}
