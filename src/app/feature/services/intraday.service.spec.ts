import { TestBed } from '@angular/core/testing';

import { IntradayService } from './intraday.service';

describe('IntradayService', () => {
  let service: IntradayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntradayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
