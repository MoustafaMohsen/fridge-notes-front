import { TestBed } from '@angular/core/testing';

import { TestMethodsService } from './test-methods.service';

describe('TestMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestMethodsService = TestBed.get(TestMethodsService);
    expect(service).toBeTruthy();
  });
});
