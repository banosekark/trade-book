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
import { Strategy } from '../../models/strategy.model';
import { IntraDayService } from '../../services/intraday.service';
import { UploadComponent } from '../../../themes/components/upload/upload.component';
import { FileUploadService } from '../../../themes/services/file-upload.service';
import { TradePlanService } from '../../services/trade-plan.service';
import { TradeCalculatorSettingsComponent } from './trade-calculator-settings/trade-calculator-settings.component';

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
    UploadComponent,
    TradeCalculatorSettingsComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './trade-calculator.component.html',
  styleUrl: './trade-calculator.component.scss',
})
export class TradeCalculatorComponent implements OnInit, AfterViewInit {
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  strategy_options: Strategy[] = [
    { name: 'Support & Resistance' },
    { name: 'Triangle Pattern' },
    { name: 'Trendline' },
    { name: 'Triangle Pattern' },
    { name: 'Channel Pattern' },
    { name: 'Rectangle Formation' },
    { name: 'Double Top' },
    { name: 'Double Bottom' },
    { name: 'Triple Top' },
    { name: 'Triple Bottom' },
    { name: 'Head & Shoulder' },
    { name: 'Pole Pattern' },
    { name: 'Breakout' },
    { name: 'Inside Candle' },
    { name: 'Follow the Footprints' },
    { name: 'Pro-Gap' },
    { name: 'EMA 8/20' },
    { name: 'Top Down Approach' },
  ];
  arrayOfObjects!: Observable<User[]>;
  strategyOptions!: Observable<Strategy[]>;
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
    private formBuilder: FormBuilder,
    private intraDayService: IntraDayService,
    private fileUploadService: FileUploadService,
    private tradePlanService: TradePlanService
  ) {
    this.fileUploadService.stockNameList.subscribe((data: any) => {
      this.options = [...data];
      this.tradeCalculatorForm?.controls['autoComplete']?.patchValue(
        this.options
      );
      console.log('Stock Name List:', this.options);
    });
  }

  ngOnInit() {
    this.onTradeCalculatorForm();
    this.arrayOfObjects = this.tradeCalculatorForm
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

  // get tradeCalculatorForm controls for easy access
  get tradeCalculatorFormControls() {
    return this.tradeCalculatorForm.controls;
  }

  // get tradeCalculatorForm value for easy access
  get tradeCalculatorFormValue() {
    return this.tradeCalculatorForm.value;
  }

  // get tradeCalculatorForm valid for easy access
  get tradeCalculatorFormValid() {
    return this.tradeCalculatorForm.valid;
  }

  // get tradeCalculatorForm invalid for easy access
  get tradeCalculatorFormInvalid() {
    return this.tradeCalculatorForm.invalid;
  }

  // get autoComplete controls value for easy access
  get autoComplete() {
    return this.tradeCalculatorForm.controls['autoComplete'].value;
  }

  // get totalCapital controls value for easy access
  get totalCapital() {
    return this.tradeCalculatorForm.controls['totalCapital'].value;
  }

  // get tradeType controls value for easy access
  get tradeTypeValue() {
    return this.tradeCalculatorForm.controls['tradeType'].value;
  }

  // get strategy controls value for easy access
  get strategy() {
    return this.tradeCalculatorForm.controls['strategy'].value;
  }

  // get tradeDate controls value for easy access
  get tradeDateValue() {
    return this.tradeCalculatorForm.controls['tradeDate'].value;
  }

  // get entry controls value for easy access
  get entry() {
    return this.tradeCalculatorForm.controls['entry'].value;
  }

  // get stopLoss controls value for easy access

  get stopLoss() {
    return this.tradeCalculatorForm.controls['stopLoss'].value;
  }

  // get ratio controls value for easy access
  get ratio() {
    return this.tradeCalculatorForm.controls['ratio'].value;
  }

  // get riskPoint controls value for easy access

  get riskPoint() {
    return this.tradeCalculatorForm.controls['riskPoint'].value;
  }

  // get riskAmount controls value for easy access
  get riskAmount() {
    return this.tradeCalculatorForm.controls['riskAmount'].value;
  }

  // get targetPrice controls value for easy access
  get targetPrice() {
    return this.tradeCalculatorForm.controls['targetPrice'].value;
  }

  // get targetPrice3 controls value for easy access
  get targetPrice3() {
    return this.tradeCalculatorForm.controls['targetPrice3'].value;
  }

  // get rewardPossible controls value for easy access
  get rewardPossible() {
    return this.tradeCalculatorForm.controls['rewardPossible'].value;
  }

  // get rewardPossible3 controls value for easy access
  get rewardPossible3() {
    return this.tradeCalculatorForm.controls['rewardPossible3'].value;
  }

  // get quantity controls value for easy access
  get quantity() {
    return this.tradeCalculatorForm.controls['quantity'].value;
  }

  // get lot controls value for easy access
  get lot() {
    return this.tradeCalculatorForm.controls['lot'].value;
  }

  // get capitalRequired controls value for easy access
  get capitalRequiredValue() {
    return this.tradeCalculatorForm.controls['capitalRequired'].value;
  }

  // get percentageOfCapital controls value for easy access
  get percentageOfCapital() {
    return this.tradeCalculatorForm.controls['percentageOfCapital'].value;
  }

  // get riskPerTrade controls value for easy access
  get riskPerTrade() {
    return this.tradeCalculatorForm.controls['riskPerTrade'].value;
  }

  tradeUserInputData: any;

  OnTradeCalculatorFormSubmitted() {
    this.tradeUserInputData = this.tradeCalculatorForm.value;
    this.tradePlanService.tradeCalculatedData.next(this.tradeUserInputData);
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
    this.tradeType = event.checked;
    this.selected = this.tradeType ? 'Buy' : 'Sell';
    this.validateEntryAndStopLoss();
  }

  calculateAmount(): void {
    this.validateEntryAndStopLoss();
    this.capitalRequired();
  }

  private validateEntryAndStopLoss() {
    const { entry, stopLoss } = this.tradeCalculatorFormValue;
    if (this.tradeType) {
      this.onEntryIsGraterThanSL(entry, stopLoss);
    } else {
      this.onSLIsGraterThanEntry(stopLoss, entry);
    }
  }

  private onSLIsGraterThanEntry(stopLoss: number, entry: number) {
    if (stopLoss < entry) {
      this.tradeCalculatorFormControls['riskPoint'].patchValue(null);
      this.tradeCalculatorFormControls['stopLoss'].setErrors({
        invalid: true,
      });
    } else {
      if (this.isRiskPoint) {
        this.calculateRiskPoint(entry, stopLoss);
      } else {
        this.calculateRiskAmount();
      }
      if (this.isQuantity) {
        this.calculateNoOfShares();
      } else {
        this.calculateNoOfSharesForLot();
      }
      this.tradeCalculatorFormControls['stopLoss'].setErrors(null);
      this.tradeCalculatorFormControls['entry'].setErrors(null);
      // this.calculateTargetPrice(entry, riskValue);
    }
  }

  private onEntryIsGraterThanSL(entry: number, stopLoss: number) {
    if (entry < stopLoss) {
      this.tradeCalculatorFormControls['riskPoint'].patchValue(null);
      this.tradeCalculatorFormControls['entry'].setErrors({ invalid: true });
    } else {
      if (this.isRiskPoint) {
        this.calculateRiskPoint(entry, stopLoss);
      } else {
        this.calculateRiskAmount();
      }
      if (this.isQuantity) {
        this.calculateNoOfShares();
      } else {
        this.calculateNoOfSharesForLot();
      }
      this.tradeCalculatorFormControls['stopLoss'].setErrors(null);
      this.tradeCalculatorFormControls['entry'].setErrors(null);
      // this.calculateTargetPrice(entry, riskValue);
    }
  }

  toggleRiskPointIcon() {
    this.validateEntryAndStopLoss();
    this.calculateRiskAmount();
    this.isRiskPoint = !this.isRiskPoint;
  }
  toggleQuantityIcon() {
    this.validateEntryAndStopLoss();

    this.isQuantity = !this.isQuantity;
  }

  calculateRiskPoint(entry: number, stopLoss: number) {
    const riskValue = this.intraDayService.getRiskPoint(entry, stopLoss);
    this.tradeCalculatorFormControls['riskPoint'].patchValue(riskValue);
    this.calculateTargetPrice(entry, Number(riskValue)); // Convert riskValue to a number
    this.calculateRewardPossible();
  }
  calculateRiskAmount() {
    const riskAmount = this.intraDayService.getRiskAmount(
      this.quantity,
      this.riskPoint
    );
    this.tradeCalculatorFormControls['riskAmount'].setValue(riskAmount);
  }

  onChangeRatio(event: any) {
    console.log(event.value);
    event.value === '2'
      ? (this.OptionFirstSelected = true)
      : (this.OptionFirstSelected = false);
    this.calculateRiskPoint(this.entry, this.stopLoss);
  }

  calculateTargetPrice(entry: number, riskValue: number) {
    this.calculateRiskAmount();

    if (this.OptionFirstSelected) {
      const targetPrice = this.intraDayService.getTargetPrice(
        entry,
        riskValue
      )[0];
      this.tradeCalculatorFormControls['targetPrice'].setValue(targetPrice);
    } else {
      const targetPrice = this.intraDayService.getTargetPrice(
        entry,
        riskValue
      )[1];
      this.tradeCalculatorFormControls['targetPrice3'].setValue(targetPrice);
    }
  }

  calculateRewardPossible() {
    this.OptionFirstSelected
      ? this.onRewardPossibleMethod(
          this.entry,
          this.riskAmount,
          this.targetPrice
        )
      : this.onRewardPossibleMethod(
          this.entry,
          this.riskAmount,
          this.targetPrice3
        );
  }

  private onRewardPossibleMethod(
    entry: number,
    riskAmount: number,
    targetPrice: number
  ) {
    const rewardPossible = this.intraDayService.getRewardPossible(
      entry,
      riskAmount
    )[0];
    this.tradeCalculatorFormControls['rewardPossible'].patchValue(
      rewardPossible
    );

    const rewardPossible3 = this.intraDayService.getRewardPossible(
      entry,
      riskAmount
    )[1];
    this.tradeCalculatorFormControls['rewardPossible3'].patchValue(
      rewardPossible3
    );
  }

  private calculateRiskPerTrade() {
    const riskPerTrade = this.intraDayService.getRiskPerTrade(
      this.totalCapital
    );
    this.tradeCalculatorFormControls['riskPerTrade'].patchValue(riskPerTrade);
  }

  calculateNoOfShares() {
    const noOfShares = this.intraDayService.getQuantity(
      this.entry,
      this.riskPoint,
      this.totalCapital
    );

    this.tradeCalculatorFormControls['quantity'].patchValue(noOfShares);
  }
  calculateNoOfSharesForLot() {}

  capitalRequired() {
    const capitalRequired = this.intraDayService.getCapitalRequired(
      this.entry,
      this.quantity
    );
    this.tradeCalculatorFormControls['capitalRequired'].patchValue(
      capitalRequired
    );
    this.calculatePercentageOfCapital();
  }

  private calculatePercentageOfCapital() {
    // Add your implementation here
    // Calculate the percentage of capital based on the quantity and other factors

    const percentageOfCapital = this.intraDayService.getPercentageOfCapital(
      this.capitalRequiredValue,
      this.totalCapital
    );
    this.tradeCalculatorFormControls['percentageOfCapital'].patchValue(
      percentageOfCapital
    );

    this.calculateRiskPerTrade();
  }

  setting() {
    console.log('Setting');
  }
}
