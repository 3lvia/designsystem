import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith, pairwise, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  /**
   * Only emit routing events when the path (URL without query params) has changed.
   * @returns An Observable containing the new path.
   */
  urlPathChange(): Observable<string> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null), // Start with a null value to make the first navigation pass the pairwise pipe (which requires two events to have been fired)
      pairwise(),
      map(([oldRoute, newRoute]) => {
        const oldPath = oldRoute?.urlAfterRedirects.split('#')[0].split('?')[0];
        const newPath = newRoute?.urlAfterRedirects.split('#')[0].split('?')[0];

        return [oldPath, newPath];
      }),
      filter(([oldPath, newPath]) => oldPath !== newPath),
      map(([_, newPath]) => newPath!),
    );
  }

  getCurrentUrlPath(): string {
    return this.router.url.split('#')[0].split('?')[0];
  }

  getCurrentQueryParams(): Record<string, string | number> {
    return this.activatedRoute.snapshot.queryParams;
  }

  getCurrentFragment(): string {
    return location.hash.substring(1);
  }
}
