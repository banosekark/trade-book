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
  isFirstIcon = false;
  selected = 'option2';
  tradeCalculatorForm!: FormGroup;
  private _tradeCalculatorData: any;

  public get tradeCalculatorData(): any {
    return this._tradeCalculatorData;
  }
  public set tradeCalculatorData(value: any) {
    this._tradeCalculatorData = value;
  }
  tradeDate = new FormControl(new Date());

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
      tradeType: ['', Validators.required],
      strategy: [''],
      tradeDate: [new Date(), Validators.required],
      entry: ['', [Validators.required]],
      stopLoss: ['', Validators.required],
      riskAmount: [''],
      rewardPossible: [''],
      quantity: [''],
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
    const entry = this.tradeCalculatorForm.controls['entry'].value || 0;
    const stopLoss = this.tradeCalculatorForm.controls['stopLoss'].value || 0;
    this.tradeType = event.checked;
    this.selected = this.tradeType ? 'Buy' : 'Sell';
    this.validateEntryAndStopLoss({ entry, stopLoss });
  }

  public changeIcon() {
    this.isFirstIcon = !this.isFirstIcon;
  }

  calculateRiskAmount(): void {
    const entry = this.tradeCalculatorForm.controls['entry'].value || 0;
    const stopLoss = this.tradeCalculatorForm.controls['stopLoss'].value || 0;
    this.validateEntryAndStopLoss({ entry, stopLoss });
  }

  private validateEntryAndStopLoss({
    entry,
    stopLoss,
  }: {
    entry: number;
    stopLoss: number;
  }) {
    this.newMethod(entry, stopLoss);
  }

  private newMethod(entry: number, stopLoss: number) {
    if (this.tradeType) {
      this.newMethod_1(entry, stopLoss);
    } else {
      this.newMethod_2(stopLoss, entry);
    }
  }

  private newMethod_2(stopLoss: number, entry: number) {
    if (stopLoss < entry) {
      this.tradeCalculatorForm.controls['riskAmount'].patchValue(null);
      this.tradeCalculatorForm.controls['stopLoss'].setErrors({
        invalid: true,
      });
    } else {
      const riskAmount = stopLoss - entry;
      this.tradeCalculatorForm.controls['riskAmount'].patchValue(riskAmount);
      this.tradeCalculatorForm.controls['stopLoss'].setErrors(null);
    }
  }

  private newMethod_1(entry: number, stopLoss: number) {
    if (entry < stopLoss) {
      this.tradeCalculatorForm.controls['riskAmount'].patchValue(null);
      this.tradeCalculatorForm.controls['entry'].setErrors({ invalid: true });
    } else {
      const riskValue = Math.abs(entry - stopLoss);
      console.log(riskValue);
      this.tradeCalculatorForm.controls['riskAmount'].patchValue(riskValue);
      this.tradeCalculatorForm.controls['entry'].setErrors(null);
    }
  }
}
