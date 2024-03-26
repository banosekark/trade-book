import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalPlanningComponent } from './goal-planning.component';

describe('GoalPlanningComponent', () => {
  let component: GoalPlanningComponent;
  let fixture: ComponentFixture<GoalPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalPlanningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
