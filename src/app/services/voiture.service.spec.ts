import { TestBed } from '@angular/core/testing';

import { VoitureService } from './voiture.service';

describe('VoitureService', () => {
  let service: VoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
