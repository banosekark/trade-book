import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGoalFormComponent } from './generate-goal-form.component';

describe('GenerateGoalFormComponent', () => {
  let component: GenerateGoalFormComponent;
  let fixture: ComponentFixture<GenerateGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateGoalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
