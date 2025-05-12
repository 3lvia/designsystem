import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appIllustrationBase]',
})
export class IllustrationBaseDirective {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostBinding('class.overflow-right') showGradient = true;

  @HostListener('window:resize')
  @HostListener('scroll')
  onScroll() {
    const scrollLeft = this.elementRef.nativeElement.scrollLeft;
    const element = this.elementRef.nativeElement;

    const hasScroll = element.clientWidth < element.scrollWidth;
    const scrollRight = element.scrollWidth - (element.clientWidth + scrollLeft);

    this.showGradient = hasScroll && scrollRight > 20;
  }
}
