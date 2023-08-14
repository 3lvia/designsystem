import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Subject, fromEvent, merge, take, takeUntil } from 'rxjs';
import { RouterService } from 'src/app/core/services/router.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { NavbarBase } from '../navbar-base';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { FlexibleFullHeightDirective } from './flexible-full-height.directive';

@Component({
  selector: 'app-desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.scss'],
  hostDirectives: [FlexibleFullHeightDirective],
})
export class DesktopNavbarComponent extends NavbarBase implements AfterViewInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLDivElement>;
  listOverflows = false;
  activeRoute = '';

  constructor(
    private ngZone: NgZone,
    cmsService: CMSService,
    localeService: LocalizationService,
    routerService: RouterService,
    location: Location,
  ) {
    super(cmsService, localeService, routerService);
    this.activeRoute = location.path();
    routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe(() => (this.activeRoute = location.path()));

    this.navbarListChange
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.ngZone.onStable.pipe(take(1)).subscribe(() => this.setListOverflow()));
  }

  ngAfterViewInit(): void {
    merge(fromEvent(this.scrollContainer.nativeElement, 'scroll'), fromEvent(window, 'resize'))
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => this.setListOverflow());
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private setListOverflow(): void {
    if (this.scrollContainer?.nativeElement) {
      const element = this.scrollContainer.nativeElement;
      const scrollBottom = element.scrollHeight - (element.clientHeight + element.scrollTop);
      this.listOverflows = scrollBottom > 10;
    }
  }
}
