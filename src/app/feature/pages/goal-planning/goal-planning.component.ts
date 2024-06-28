import { Component } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { GoalTableComponent } from './goal-table/goal-table.component';
import { GenerateGoalFormComponent } from './generate-goal-form/generate-goal-form.component';
import { MatButtonModule } from '@angular/material/button';
import { TradePlanService } from '../../services/trade-plan.service';

@Component({
  selector: 'app-goal-planning',
  standalone: true,
  imports: [
    SettingsComponent,
    GoalTableComponent,
    GenerateGoalFormComponent,
    MatButtonModule,
  ],
  templateUrl: './goal-planning.component.html',
  styleUrl: './goal-planning.component.scss',
})
export class GoalPlanningComponent {
  goalTableData: any;

  constructor(private tradePlanService: TradePlanService) {
    this.tradePlanService.getDataArray().subscribe((data) => {
      this.goalTableData = data;
      console.log('data', data);
    });
  }
}
