import { Component } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { GoalTableComponent } from './goal-table/goal-table.component';

@Component({
  selector: 'app-goal-planning',
  standalone: true,
  imports: [SettingsComponent, GoalTableComponent],
  templateUrl: './goal-planning.component.html',
  styleUrl: './goal-planning.component.scss',
})
export class GoalPlanningComponent {}
