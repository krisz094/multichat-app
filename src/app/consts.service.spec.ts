import { TestBed } from '@angular/core/testing';

import { ConstsService } from './consts.service';

describe('ConstsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstsService = TestBed.get(ConstsService);
    expect(service).toBeTruthy();
  });
});
