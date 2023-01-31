import { TestBed } from '@angular/core/testing';

import { MarqueService } from './marque.service';

describe('MarqueService', () => {
  let service: MarqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
