import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import packageJson from '@elvia/elvis/package.json';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnDestroy {
  version = packageJson.version;

  private onDestroy = new Subject();

  private onDestroy$ = this.onDestroy.asObservable();

  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) {}

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
  navigateGetStarted(): void {
    this.router.navigate(['/get-started']);
    this.onClose();
  }
  navigateIdentity(): void {
    this.router.navigate(['/identity']);
    this.onClose();
  }
  navigateComps(): void {
    this.router.navigate(['/components']);
    this.onClose();
  }
  navigateTools(): void {
    this.router.navigate(['/tools']);
    this.onClose();
  }
  navigateCommunity(): void {
    this.router.navigate(['/community']);
    this.onClose();
  }
}
