import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivate2Guard } from './can-deactivate2.guard';

describe('CanDeactivate2Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivate2Guard]
    });
  });

  it('should ...', inject([CanDeactivate2Guard], (guard: CanDeactivate2Guard) => {
    expect(guard).toBeTruthy();
  }));
});
