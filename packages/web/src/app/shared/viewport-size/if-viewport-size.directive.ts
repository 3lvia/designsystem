import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef, inject } from '@angular/core';
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
  private breakpointService = inject(BreakpointService);
  private templateRef = inject<TemplateRef<any>>(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  private subscription = new Subscription();

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input('ifViewportSize') set size(values: ScreenSize[]) {
    this.subscription.unsubscribe();
    this.subscription = this.breakpointService.matches(values).subscribe(this.updateView);
  }

  updateView = (matches: boolean) => {
    if (matches && !this.viewContainerRef.length) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (!matches && this.viewContainerRef.length) {
      this.viewContainerRef.clear();
    }
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
