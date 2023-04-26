import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith, pairwise, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  /**
   * Only emit routing events when the path (URL without query params) has changed
   */
  urlPathChange(): Observable<void> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null), // Start with a null value to make the first navigation pass the pairwise pipe (which requires two events to have been fired)
      pairwise(),
      filter(([oldRoute, newRoute]) => {
        const oldUrl = (oldRoute as NavigationEnd)?.urlAfterRedirects.split('?')[0];
        const newUrl = (newRoute as NavigationEnd).urlAfterRedirects.split('?')[0];

        return oldUrl !== newUrl;
      }),
      map(() => {}),
    );
  }
}
