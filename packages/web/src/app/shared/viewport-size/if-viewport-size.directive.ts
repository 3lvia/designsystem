import { Directive, OnDestroy, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointService, ScreenSize } from 'src/app/core/services/breakpoint.service';

/**
 * This directive is intended for use cases where it is not sufficient
 * to hide a component on different break points with CSS, because hiding a
 * component does not prevent it from mounting. A component may for example
 * inject a service and alter global state. In such cases preventing
 * the component from mounting through the use of this directive will
 * prevent the component from altering global state.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective implements OnDestroy {
  private subscription = new Subscription();

  @Input('ifViewportSize') set size(values: ScreenSize[]) {
    this.subscription.unsubscribe();
    this.subscription = this.breakpointService.matches(values).subscribe(this.updateView);
  }

  constructor(
    private breakpointService: BreakpointService,
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  updateView = (matches: boolean) => {
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
