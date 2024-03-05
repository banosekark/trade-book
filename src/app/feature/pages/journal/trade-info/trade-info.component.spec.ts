import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeInfoComponent } from './trade-info.component';

describe('TradeInfoComponent', () => {
  let component: TradeInfoComponent;
  let fixture: ComponentFixture<TradeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
