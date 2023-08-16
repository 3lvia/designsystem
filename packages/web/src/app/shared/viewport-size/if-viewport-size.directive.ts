import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Directive, OnDestroy, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const config = {
  sm: '(max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 1023px)',
  lg: '(min-width: 1024px) and (max-width: 1439px)',
  xl: '(min-width: 1440px)',
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective implements OnDestroy {
  private subscription = new Subscription();

  @Input('ifViewportSize') set size(values: Size[]) {
    this.subscription.unsubscribe();
    this.subscription = this.observer
      .observe(values.map((value) => config[value]))
      .subscribe(this.updateView);
  }

  constructor(
    private observer: BreakpointObserver,
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  updateView = ({ matches }: BreakpointState) => {
    if (matches && !this.vcRef.length) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else if (!matches && this.vcRef.length) {
      this.vcRef.clear();
    }
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
