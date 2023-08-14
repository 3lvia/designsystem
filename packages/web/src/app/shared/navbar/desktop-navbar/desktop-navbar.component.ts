import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject, first, fromEvent, merge, takeUntil } from 'rxjs';
import { RouterService } from '../../../core/services/router.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { NavbarBase } from '../navbar-base';
import { CMSService } from '../../../core/services/cms/cms.service';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.scss'],
})
export class DesktopNavbarComponent extends NavbarBase implements OnChanges, AfterViewInit, OnDestroy {
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
    this.setActiveRoute(location.path());
    routerService
      .urlPathChange()
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.setActiveRoute(location.path()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.ngZone.onStable
        .pipe(takeUntil(this.unsubscriber), first())
        .subscribe(() => this.setListOverflow());
    }
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

  private setActiveRoute(url: string): void {
    this.activeRoute = url.split('/')[2];
  }

  private setListOverflow(): void {
    if (this.scrollContainer?.nativeElement) {
      const element = this.scrollContainer.nativeElement;
      const scrollBottom = element.scrollHeight - (element.clientHeight + element.scrollTop);
      this.listOverflows = scrollBottom > 10;
    }
  }
}
