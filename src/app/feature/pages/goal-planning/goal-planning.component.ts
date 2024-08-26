import { Component } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { GoalTableComponent } from './goal-table/goal-table.component';
import { GenerateGoalFormComponent } from './generate-goal-form/generate-goal-form.component';
import { MatButtonModule } from '@angular/material/button';
import { TradePlanService } from '../../services/trade-plan.service';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-goal-planning',
  standalone: true,
  imports: [
    SettingsComponent,
    GoalTableComponent,
    GenerateGoalFormComponent,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  templateUrl: './goal-planning.component.html',
  styleUrl: './goal-planning.component.scss',
})
export class GoalPlanningComponent {
  goalTableData: any;

  constructor(
    private tradePlanService: TradePlanService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  savePlan(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
