import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TradePlanService } from '../../../services/trade-plan.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  goalSettingForm!: FormGroup;
  goalSettingsFormData!: any[];

  constructor(
    private fb: FormBuilder,
    private tradePlanService: TradePlanService
  ) {
    this.tradePlanService.getSettingsData().subscribe((data) => {
      this.goalSettingsFormData = data;
      console.log('data', data);
    });
  }

  ngOnInit() {
    this.onGoalSettingFormInit();
    this.tradePlanService.selectedRowData$.subscribe((data) => {
      if (data) {
        this.goalSettingForm.patchValue(data);
      }
    });
  }

  onGoalSettingFormInit() {
    this.goalSettingForm = this.fb.group({
      // generateGoal: this.fb.array([this.fb.control('')]),
      date: [''],
      openingCapital: [0],
      capitalIntroduced: [0],
      roi: [7],
      profit: [0],
      withdrawn: [0],
      closingCapital: [0],
      actualClosingCapital: [0],
    });
  }

  get date() {
    return this.goalSettingForm.get('date') as FormControl;
  }

  get profit() {
    return this.goalSettingForm.controls['profit'];
  }

  get openingCapital() {
    return this.goalSettingForm.controls['openingCapital'];
  }

  //get capitalIntroduced FormControl

  get capitalIntroduced() {
    return this.goalSettingForm.controls['capitalIntroduced'];
  }

  //get roi FormControl
  get roi() {
    return this.goalSettingForm.controls['roi'];
  }

  //get withdrawn FormControl
  get withdrawn() {
    return this.goalSettingForm.controls['withdrawn'];
  }

  //get closingCapital FormControl
  get closingCapital() {
    return this.goalSettingForm.controls['closingCapital'];
  }

  //get actualClosingCapital FormControl
  get actualClosingCapital() {
    return this.goalSettingForm.controls['actualClosingCapital'];
  }

  onSubmit() {
    // Get the updated data from the form
    const updatedData = this.goalSettingForm.value;

    // Update the selected row data in the service
    this.tradePlanService.updateSelectedRowData(updatedData);
  }

  onGeneratePlan() {
    const date = this.date.value;
    this.onGet12MonthsPlan(date);

    this.tradePlanService.updateDataArray(this.goalSettingsFormData);

    this.resetForm();
  }

  //reset form
  resetForm() {
    this.goalSettingForm.reset();
  }

  onGet12MonthsPlan(date: Date) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 12);
    // const dateArray: any[] = [];
    for (let i = 0; i < 12; i++) {
      const tempDate = new Date(date);
      tempDate.setMonth(date.getMonth() + i);
      // dateArray.push({ date: tempDate });
      this.goalSettingForm.controls['date'].patchValue(tempDate);
      this.calculateProfit(
        this.openingCapital.value,
        this.capitalIntroduced.value,
        this.roi.value
      );
      // add the previous month closing capital to the current month opening capital
      if (i > 0) {
        // take closing capital if actual closing capital is not provided
        if (this.actualClosingCapital.value === 0) {
          this.openingCapital.patchValue(this.closingCapital.value);
        } else {
          this.openingCapital.patchValue(this.actualClosingCapital.value);
        }

        this.calculateProfit(
          this.openingCapital.value,
          this.capitalIntroduced.value,
          this.roi.value
        );
        this.calculateClosingCapital(this.profit.value);
      }

      this.updateSettingsData(i);
      this.tradePlanService.updateSettingsData({
        ...this.goalSettingForm.value,
        position: i,
      });
    }
  }

  updateSettingsData(index: number) {
    this.goalSettingsFormData[index] = this.goalSettingForm.value;
  }

  calculateProfit(
    openingCapital: number,
    capitalIntroduced: number,
    roi: number
  ) {
    openingCapital = openingCapital !== null ? +openingCapital : 0;
    capitalIntroduced = capitalIntroduced !== null ? +capitalIntroduced : 0;
    //convet capitalIntroduced string to number
    // capitalIntroduced = +capitalIntroduced;
    const profit = ((openingCapital + capitalIntroduced) * roi) / 100;

    this.goalSettingForm.controls['profit'].patchValue(profit);
    this.calculateClosingCapital(profit);
  }

  calculateClosingCapital(profit: number) {
    let openingCapital =
      this.openingCapital.value !== null ? +this.openingCapital.value : 0;
    let capitalIntroduced =
      this.capitalIntroduced.value !== null ? +this.capitalIntroduced.value : 0;
    let withdrawn = this.withdrawn.value !== null ? this.withdrawn.value : 0;
    const closingCapital = Math.round(
      +openingCapital + capitalIntroduced + profit - withdrawn
    );

    this.goalSettingForm.controls['closingCapital'].patchValue(closingCapital);
  }
}
