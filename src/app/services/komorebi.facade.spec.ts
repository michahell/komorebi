import { TestBed } from '@angular/core/testing';

import { KomorebiFacade } from './komorebi.facade';

describe('KomorebiFacade', () => {
  let service: KomorebiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KomorebiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
