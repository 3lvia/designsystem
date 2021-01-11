/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HighlightService } from './highlight.service';

describe('Service: Highlight', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightService],
    });
  });

  it('should ...', inject([HighlightService], (service: HighlightService) => {
    expect(service).toBeTruthy();
  }));
});
