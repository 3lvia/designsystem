import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Subject, fromEvent, merge, switchMap, take, takeUntil } from 'rxjs';
import { RouterService } from 'src/app/core/services/router.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarBase } from '../navbar-base';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { FlexibleFullHeightDirective } from './flexible-full-height.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

const animationMotion = '320ms cubic-bezier(0.5, 0, 0.31, 1)';
@Component({
  selector: 'app-desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.scss'],
  hostDirectives: [FlexibleFullHeightDirective],
  animations: [
    trigger('animateHeightOnItemEnter', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', animate(animationMotion)),
      transition(':leave', [animate(animationMotion, style({ height: 0 }))]),
    ]),
  ],
})
export class DesktopNavbarComponent extends NavbarBase implements AfterViewInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLDivElement>;
  listOverflows = false;
  activeRoute = location.pathname;

  get activeLandingPage(): string {
    return this.activeRoute.split('/')[1];
  }

  constructor(
    private ngZone: NgZone,
    routerService: RouterService,
    cmsService: CMSService,
    localeService: LocalizationService,
  ) {
    super(cmsService, localeService, routerService);
    this.setActiveRoute();

    this.navbarListChange
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => this.ngZone.onStable.pipe(take(1))),
      )
      .subscribe(() => this.setListOverflow());
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

  private setActiveRoute(): void {
    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe(() => (this.activeRoute = this.routerService.getCurrentUrlPath()));
  }

  private setListOverflow(): void {
    if (this.scrollContainer?.nativeElement) {
      const element = this.scrollContainer.nativeElement;
      const scrollBottom = element.scrollHeight - (element.clientHeight + element.scrollTop);
      this.listOverflows = scrollBottom > 10;
    }
  }
}
