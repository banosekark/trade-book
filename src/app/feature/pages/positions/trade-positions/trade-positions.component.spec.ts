import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePositionsComponent } from './trade-positions.component';

describe('TradePositionsComponent', () => {
  let component: TradePositionsComponent;
  let fixture: ComponentFixture<TradePositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradePositionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradePositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
