import { TestBed } from '@angular/core/testing';

import { ModeleService } from './modele.service';

describe('ModeleService', () => {
  let service: ModeleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
