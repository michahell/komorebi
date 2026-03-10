import { TestBed } from '@angular/core/testing';

import { GoldenHourService } from './golden-hour-service';

describe('GoldenHourService', () => {
  let service: GoldenHourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoldenHourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
