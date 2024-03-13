import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';

export interface User {
  name: string;
}

@Component({
  selector: 'app-trade-calculator',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatDividerModule,
    MatRadioModule,
    CommonModule,
    MatChipsModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './trade-calculator.component.html',
  styleUrl: './trade-calculator.component.scss',
})
export class TradeCalculatorComponent implements OnInit, AfterViewInit {
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions!: Observable<User[]>;
  tradeType: boolean = false;
  public icon = 'close';
  selected = 'option2';
  tradeCalculatorForm!: FormGroup;
  private _tradeCalculatorData: any;
  OptionFirstSelected: boolean = true;

  public get tradeCalculatorData(): any {
    return this._tradeCalculatorData;
  }
  public set tradeCalculatorData(value: any) {
    this._tradeCalculatorData = value;
  }
  tradeDate = new FormControl(new Date());
  isRiskPoint: boolean = true;
  isQuantity: boolean = true;

  @ViewChild('tradeCalculator') tradeCalculator!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.onTradeCalculatorForm();
    this.filteredOptions = this.tradeCalculatorForm
      .get('autoComplete')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options.slice();
        })
      );
  }

  ngAfterViewInit(): void {
    // this.renderer.setAttribute(this.tradeCalculator, 'color', 'warn');
  }

  onTradeCalculatorForm() {
    this.tradeCalculatorForm = this.formBuilder.group({
      autoComplete: ['', Validators.required],
      totalCapital: ['165000', Validators.required],
      tradeType: ['', Validators.required],
      strategy: [''],
      tradeDate: [new Date(), Validators.required],
      entry: ['', [Validators.required]],
      stopLoss: ['', Validators.required],
      ratio: ['2', [Validators.required]],
      riskPoint: [''],
      riskAmount: [''],
      targetPrice: [''],
      targetPrice3: [''],
      rewardPossible: [''],
      rewardPossible3: [''],
      quantity: [''],
      lot: [''],
      capitalRequired: [''],
      percentageOfCapital: [''],
      riskPerTrade: [''],
    });
  }

  // Submit Form

  tradeUserInputData: any;

  OnTradeCalculatorFormSubmitted() {
    this.tradeUserInputData = this.tradeCalculatorForm.value;
    console.log(this.tradeUserInputData);
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onChangeTradeType(event: MatSlideToggleChange) {
    // reset control values
    this.tradeCalculatorForm.controls['entry'].patchValue(null);
    const entry = this.tradeCalculatorForm.controls['entry'].value || 0;
    const stopLoss = this.tradeCalculatorForm.controls['stopLoss'].value || 0;
    this.tradeType = event.checked;
    this.selected = this.tradeType ? 'Buy' : 'Sell';
    this.validateEntryAndStopLoss({ entry, stopLoss });
  }

  calculateAmount(): void {
    const entry = this.tradeCalculatorForm.controls['entry'].value || 0;
    const stopLoss = this.tradeCalculatorForm.controls['stopLoss'].value || 0;
    this.validateEntryAndStopLoss({ entry, stopLoss });
    // this.calculateNoOfShares();
  }

  private validateEntryAndStopLoss({
    entry,
    stopLoss,
  }: {
    entry: number;
    stopLoss: number;
  }) {
    this.onEntrySLMethod(entry, stopLoss);
  }

  private onEntrySLMethod(entry: number, stopLoss: number) {
    if (this.tradeType) {
      this.onEntryIsGraterThanSL(entry, stopLoss);
    } else {
      this.onSLIsGraterThanEntry(stopLoss, entry);
    }
  }

  private onSLIsGraterThanEntry(stopLoss: number, entry: number) {
    let riskValue: number; // Declare the riskValue variable
    if (stopLoss < entry) {
      this.tradeCalculatorForm.controls['riskPoint'].patchValue(null);
      this.tradeCalculatorForm.controls['stopLoss'].setErrors({
        invalid: true,
      });
    } else {
      this.isRiskPoint
        ? this.calculateRiskPoint(entry, stopLoss)
        : this.calculateRiskAmount();
      this.isQuantity
        ? this.calculateNoOfShares()
        : this.calculateNoOfSharesForLot;
      this.tradeCalculatorForm.controls['stopLoss'].setErrors(null);
      this.tradeCalculatorForm.controls['entry'].setErrors(null);
      // this.calculateTargetPrice(entry, riskValue);
    }
  }

  private onEntryIsGraterThanSL(entry: number, stopLoss: number) {
    if (entry < stopLoss) {
      this.tradeCalculatorForm.controls['riskPoint'].patchValue(null);
      this.tradeCalculatorForm.controls['entry'].setErrors({ invalid: true });
    } else {
      this.isRiskPoint
        ? this.calculateRiskPoint(entry, stopLoss)
        : this.calculateRiskAmount();
      this.isQuantity
        ? this.calculateNoOfShares()
        : this.calculateNoOfSharesForLot;
      this.tradeCalculatorForm.controls['stopLoss'].setErrors(null);
      this.tradeCalculatorForm.controls['entry'].setErrors(null);
      // this.calculateTargetPrice(entry, riskValue);
    }
  }

  toggleRiskPointIcon() {
    const entry = this.tradeCalculatorForm.controls['entry'].value || 0;
    const stopLoss = this.tradeCalculatorForm.controls['stopLoss'].value || 0;
    this.validateEntryAndStopLoss({ entry, stopLoss });
    this.isRiskPoint = !this.isRiskPoint;
  }
  toggleQuantityIcon() {
    const entry = this.tradeCalculatorForm.controls['entry'].value || 0;
    const stopLoss = this.tradeCalculatorForm.controls['stopLoss'].value || 0;
    this.validateEntryAndStopLoss({ entry, stopLoss });

    this.isQuantity = !this.isQuantity;
  }

  calculateRiskPoint(entry: number, stopLoss: number) {
    const riskValue = Math.abs(entry - stopLoss).toFixed(2);
    this.tradeCalculatorForm.controls['riskPoint'].patchValue(riskValue);
  }
  calculateRiskAmount() {
    const qtyOfShares =
      this.tradeCalculatorForm.controls['quantity'].value || 0;
    const riskPoints =
      this.tradeCalculatorForm.controls['riskPoint'].value || 0;

    const riskAmount = qtyOfShares * riskPoints;
    this.tradeCalculatorForm.controls['riskAmount'].setValue(riskAmount);
  }

  onChangeRatio(event: any) {
    console.log(event.value);
    event.value === '2'
      ? (this.OptionFirstSelected = true)
      : (this.OptionFirstSelected = false);
  }

  calculateTargetPrice(entry: number, riskValue: number) {
    if (this.OptionFirstSelected) {
      const targetPrice = entry - riskValue * 2;
      this.tradeCalculatorForm.controls['targetPrice'].patchValue(targetPrice);
    } else {
      const targetPrice = entry - riskValue * 3;
      this.tradeCalculatorForm.controls['targetPrice3'].patchValue(targetPrice);
    }
  }

  calculateRewardPossible() {
    const entry = this.tradeCalculatorForm.controls['entry'].value || 0;
    const targetPrice =
      this.tradeCalculatorForm.controls['targetPrice'].value || 0;
    const targetPrice3 =
      this.tradeCalculatorForm.controls['targetPrice3'].value || 0;
    this.OptionFirstSelected
      ? this.onRewardPossibleMethod(entry, targetPrice)
      : this.onRewardPossibleMethod(entry, targetPrice3);
  }

  private calculatePercentageOfCapital() {
    // Add your implementation here
    // Calculate the percentage of capital based on the quantity and other factors
    const quantity = this.tradeCalculatorForm.controls['quantity'].value || 0;
    const capitalRequired =
      this.tradeCalculatorForm.controls['capitalRequired'].value || 0;
    const percentageOfCapital = (quantity / capitalRequired) * 100;
    this.tradeCalculatorForm.controls['percentageOfCapital'].patchValue(
      percentageOfCapital
    );

    this.calculateRiskPerTrade();
  }

  private calculateRiskPerTrade() {
    // Add your implementation here
    // Calculate the risk per trade based on the capital required and other factors
    const capitalRequired =
      this.tradeCalculatorForm.controls['capitalRequired'].value || 0;
    const quantity = this.tradeCalculatorForm.controls['quantity'].value || 0;
    const riskPerTrade = capitalRequired / quantity;
    this.tradeCalculatorForm.controls['riskPerTrade'].patchValue(riskPerTrade);
  }

  calculateNoOfShares() {
    const entry = this.tradeCalculatorForm.controls['entry'].value || 0;
    const totalCapital =
      this.tradeCalculatorForm.controls['totalCapital'].value || 0;
    const riskPoint = this.tradeCalculatorForm.controls['riskPoint'].value || 0;

    const noOfShares = Math.min(
      Math.round((totalCapital * 0.005) / riskPoint),
      Math.round((totalCapital * 2.5) / entry)
    );

    this.tradeCalculatorForm.controls['quantity'].patchValue(noOfShares);
  }

  calculateNoOfSharesForLot() {}

  private onRewardPossibleMethod(entry: number, targetPrice: number) {
    // Add your implementation here
    const rewardPossible = targetPrice - entry;
    this.tradeCalculatorForm.controls['rewardPossible'].patchValue(
      rewardPossible
    );

    const rewardPossible3 = targetPrice - entry;
    this.tradeCalculatorForm.controls['rewardPossible3'].patchValue(
      rewardPossible3
    );
  }
}
