import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCalculatorSettingsComponent } from './trade-calculator-settings.component';

describe('TradeCalculatorSettingsComponent', () => {
  let component: TradeCalculatorSettingsComponent;
  let fixture: ComponentFixture<TradeCalculatorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeCalculatorSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradeCalculatorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
