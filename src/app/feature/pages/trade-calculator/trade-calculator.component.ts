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
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  templateUrl: './trade-calculator.component.html',
  styleUrl: './trade-calculator.component.scss',
})
export class TradeCalculatorComponent implements OnInit, AfterViewInit {
  myControl = new FormControl<string | User>('');
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions!: Observable<User[]>;
  tradeType: boolean = false;

  @ViewChild('tradeCalculator') tradeCalculator!: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.tradeCalculator, 'color', 'warn');
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
    if (event.checked) {
      this.tradeType = true;
    } else {
      this.tradeType = false;
    }
  }
}
