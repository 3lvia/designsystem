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
   * Only emit routing events when the path (URL without query params) has changed.
   * @returns An Observable containing the new path.
   */
  urlPathChange(): Observable<string> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null), // Start with a null value to make the first navigation pass the pairwise pipe (which requires two events to have been fired)
      pairwise(),
      map(([oldRoute, newRoute]) => {
        const oldPath = (oldRoute as NavigationEnd)?.urlAfterRedirects.split('?')[0];
        const newPath = (newRoute as NavigationEnd).urlAfterRedirects.split('?')[0];

        return [oldPath, newPath];
      }),
      filter(([oldPath, newPath]) => oldPath !== newPath),
      map(([_, newPath]) => newPath),
    );
  }
}
