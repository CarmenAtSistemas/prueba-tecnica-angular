import { TestBed } from '@angular/core/testing';

import { PeliculaService } from './pelicula.service';

describe('PeliculaService', () => {
  let service: PeliculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(PeliculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
