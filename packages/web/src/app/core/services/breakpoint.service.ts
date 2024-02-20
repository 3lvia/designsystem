import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged, map } from 'rxjs';

export type ScreenSize = keyof typeof config;

const config = {
  xs: '(max-width: 430px)',
  sm: '(max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 1023px)',
  lg: '(min-width: 1024px) and (max-width: 1439px)',
  xl: '(min-width: 1440px)',
};

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  constructor(private observer: BreakpointObserver) {}

  matches(sizes: ScreenSize[]): Observable<boolean> {
    return this.observer.observe(sizes.map((value) => config[value])).pipe(
      map((state) => state.matches),
      distinctUntilChanged(),
    );
  }
}
