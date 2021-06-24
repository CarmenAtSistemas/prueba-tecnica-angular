import { TestBed } from '@angular/core/testing';

import { EstudioService } from './estudio.service';

describe('EstudioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstudioService = TestBed.get(EstudioService);
    expect(service).toBeTruthy();
  });
});
