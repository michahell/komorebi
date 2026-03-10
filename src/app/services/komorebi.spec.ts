import { TestBed } from '@angular/core/testing';

import { KomorebiService } from './komorebi.service';

describe('Komorebi', () => {
  let service: KomorebiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KomorebiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
