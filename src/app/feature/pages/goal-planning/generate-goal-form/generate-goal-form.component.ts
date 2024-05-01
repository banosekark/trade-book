import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TradePlanService } from '../../../services/trade-plan.service';

@Component({
  selector: 'app-generate-goal-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './generate-goal-form.component.html',
  styleUrl: './generate-goal-form.component.scss',
})
export class GenerateGoalFormComponent implements OnInit {
  generatePlanForm!: FormGroup;
  capitalIntroduced: any;
  profit: any;
  withdrawal: any;
  tableDataFromService!: any;
  constructor(
    private fb: FormBuilder,
    private tradePlanService: TradePlanService
  ) {
    this.tradePlanService.settingsData$.subscribe((data) => {
      this.tableDataFromService = data;
    });
  }

  ngOnInit() {
    this.onGeneratePlanFormInit();
  }
  onGeneratePlanFormInit() {
    this.generatePlanForm = this.fb.group({
      date: [''],
      openingCapital: [''],
    });
  }

  get date() {
    return this.generatePlanForm.get('date');
  }

  get openingCapital() {
    return this.generatePlanForm.get('openingCapital');
  }

  onGeneratePlan() {
    const date = this.date?.value;
    this.onGet12MonthsPlan(date);
  }

  onGet12MonthsPlan(date: Date) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 12);
    // const dateArray: any[] = [];
    let finalAmount = 0;
    let tableObject;
    // let profitAmount = 0;
    for (let i = 0; i < 39; i++) {
      const tempDate = new Date(date);

      tempDate.setMonth(date.getMonth() + i);
      // dateArray.push({ date: tempDate });
      this.generatePlanForm.controls['date'].patchValue(tempDate);
      tableObject = {
        ...this.generatePlanForm.value,
        position: i,
        //roi should be 7% of the opening capital for first 26 months after the for next 6 months it should be 12% of the opening capital and for remaining 6 months it should be 10% of the opening capital
        roi: i < 24 ? 7 + '%' : i < 30 ? 12 + '%' : 10 + '%',
        //profit should be 7% of the opening capital for first 26 months after the for next 6 months it should be 12% of the opening capital and for remaining 6 months it should be 10% of the opening capital
        profit:
          i === 0
            ? Math.round(+this.openingCapital?.value * 0.07)
            : i < 24
            ? Math.round(finalAmount * 0.07)
            : i < 30
            ? Math.round(finalAmount * 0.12)
            : Math.round(finalAmount * 0.1),
        // closing capital should be opening capital + profit

        closingCapital:
          i === 0
            ? Math.round(+this.openingCapital?.value * 0.07) +
              +this.openingCapital?.value
            : i < 24
            ? Math.round(finalAmount * 0.07) + finalAmount
            : i < 30
            ? Math.round(finalAmount * 0.12) + finalAmount
            : Math.round(finalAmount * 0.1) + finalAmount,

        // actual closing capital should be closing capital

        actualClosingCapital:
          i === 0
            ? Math.round(+this.openingCapital?.value * 0.07) +
              +this.openingCapital?.value
            : i < 24
            ? Math.round(finalAmount * 0.07) + finalAmount
            : i < 30
            ? Math.round(finalAmount * 0.12) + finalAmount
            : Math.round(finalAmount * 0.1) + finalAmount,

        // next month opening capital should be previous month actual closing capital if it is not provided then it should be opening capital user provided
        openingCapital: i === 0 ? +this.openingCapital?.value : finalAmount,
      };
      this.tradePlanService.updateSettingsData(tableObject);

      finalAmount = tableObject.actualClosingCapital;
      // profitAmount = tableObject.profit;
      // i>0 && i < 26?
    }
  }
}
