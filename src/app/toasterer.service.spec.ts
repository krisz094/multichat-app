import { TestBed } from '@angular/core/testing';

import { ToastererService } from './toasterer.service';

describe('ToastererService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastererService = TestBed.get(ToastererService);
    expect(service).toBeTruthy();
  });
});
