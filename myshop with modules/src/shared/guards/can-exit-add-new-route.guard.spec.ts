import { TestBed, async, inject } from '@angular/core/testing';

import { CanExitNotSavedRouteGuard } from './can-exit-add-new-route.guard';

describe('CanExitAddNewRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanExitNotSavedRouteGuard]
    });
  });

  it('should ...', inject([CanExitNotSavedRouteGuard], (guard: CanExitNotSavedRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
