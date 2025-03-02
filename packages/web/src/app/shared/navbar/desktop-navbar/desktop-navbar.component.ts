import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent, merge, switchMap, take } from 'rxjs';

import { LocalePickerComponent } from '../locale-picker/locale-picker.component';
import { NavbarBase } from '../navbar-base';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { RouterService } from 'src/app/core/services/router.service';

const animationMotion = '320ms cubic-bezier(0.5, 0, 0.31, 1)';
@Component({
  selector: 'app-desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.scss'],
  animations: [
    trigger('animateHeightOnItemEnter', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', animate(animationMotion)),
      transition(':leave', [animate(animationMotion, style({ height: 0 }))]),
    ]),
  ],
  imports: [NgClass, RouterLinkActive, RouterLink, SubMenuComponent, LocalePickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesktopNavbarComponent extends NavbarBase implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  private readonly scrollContainer = viewChild.required<ElementRef<HTMLDivElement>>('scrollContainer');

  listOverflows = false;
  activeRoute = location.pathname;

  get activeLandingPage(): string {
    // @ts-expect-error TS2322 (LEGO-3683)
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
    merge(fromEvent(this.scrollContainer().nativeElement, 'scroll'), fromEvent(window, 'resize'))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.setListOverflow());
  }

  private setActiveRoute(): void {
    this.routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe(() => (this.activeRoute = this.routerService.getCurrentUrlPath()));
  }

  private setListOverflow(): void {
    const scrollContainer = this.scrollContainer();
    if (scrollContainer?.nativeElement) {
      const element = scrollContainer.nativeElement;
      const scrollBottom = element.scrollHeight - (element.clientHeight + element.scrollTop);
      this.listOverflows = scrollBottom > 10;
    }
  }
}
