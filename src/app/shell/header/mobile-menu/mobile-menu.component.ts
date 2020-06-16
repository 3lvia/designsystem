import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  version = require('../../../../../style/elvis/package.json').version;

  private onDestroy = new Subject();

  private onDestroy$ = this.onDestroy.asObservable();

  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClose(): void {
    this.onDestroy.next();
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
    this.onClose();
  }
  navigateComps(): void {
    this.router.navigate(['/components']);
    this.onClose();
  }
  navigateUtilites(): void {
    this.router.navigate(['/utilities']);
    this.onClose();
  }

}
