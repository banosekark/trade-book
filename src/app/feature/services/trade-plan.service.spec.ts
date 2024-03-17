import { TestBed } from '@angular/core/testing';

import { TradePlanService } from './trade-plan.service';

describe('TradePlanService', () => {
  let service: TradePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
