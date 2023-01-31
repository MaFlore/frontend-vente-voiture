import { TestBed } from '@angular/core/testing';

import { VenteService } from './vente.service';

describe('VenteService', () => {
  let service: VenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
