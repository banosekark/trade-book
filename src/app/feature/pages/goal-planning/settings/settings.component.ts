import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  }

  onGoalSettingFormInit() {
    this.goalSettingForm = this.fb.group({
      date: [''],
    });
  }

  get date() {
    return this.goalSettingForm.get('date') as FormControl;
  }

  onSubmitSettings() {
    console.log(this.goalSettingForm.value);
    this.goalSettingsFormData = this.goalSettingForm.value;
    this.tradePlanService.updateSettingsData(this.goalSettingsFormData);
  }

  onSelectedDate(event: any) {
    console.log(event);
    this.date.patchValue(event.value);
    this.goalSettingsFormData = this.goalSettingForm.value;
    this.tradePlanService.updateSettingsData(this.goalSettingsFormData);
  }
}
