import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  input,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TradePlanService } from '../../../services/trade-plan.service';
import e from 'express';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  date: string;
  stockName: string;
  tradeType: string;
  strategyName: string;
  entry: number;
  stopLoss: number;
  target1: number;
  target2: number;
  loss: number;
  tradeResult: string;
  rulesFollowed: string;
  position: number;
  actions: string;
  isLossDisabled: boolean;
  isTargetDisabled: boolean;
}

@Component({
  selector: 'app-trade-positions',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './trade-positions.component.html',
  styleUrl: './trade-positions.component.scss',
})
export class TradePositionsComponent implements OnInit, OnDestroy {
  // entryValue!: number;
  // slValue!: number;
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'entry',
    'stopLoss',
    'target1',
    'loss',
    'actions',
  ];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  calculatorData: any;
  inputTarget!: number;
  inputLoss!: number;
  @ViewChildren('nameInput') nameInputs!: QueryList<HTMLInputElement>;

  constructor(private tradePlanService: TradePlanService) {
    this.tradePlanService.dataArraySubject.subscribe((data: any) => {
      this.calculatorData = data;
      console.log('this.calculatorDataIn-Trade-info', this.calculatorData);
    });

    // this.ELEMENT_DATA = this.calculatorData;

    // this.ELEMENT_DATA.forEach((element, index) => {
    //   element.date = this.calculatorData[index].date;
    //   element.stockName = this.calculatorData[index]['autoComplete']['name'];
    //   element.tradeType = this.calculatorData[index]['tradeType'];
    //   element.strategyName = this.calculatorData[index]['selectStrategy'];
    //   element.entry = this.calculatorData[index].entry;
    //   element.sL = this.calculatorData[index]['stopLoss'];
    //   element.target1 = this.calculatorData[index]['target1'];
    //   element.target2 = this.calculatorData[index]['target2'];
    //   element.tradeResult = this.calculatorData[index]['tradeResult'];
    //   element.rulesFollowed = this.calculatorData[index]['rulesFollowed'];
    //   element.position = index + 1;
    //   element.actions = 'edit';

    //   this.ELEMENT_DATA.push(element);
    // });

    // get value from input fields

    this.ELEMENT_DATA = this.calculatorData;
    this.ELEMENT_DATA.forEach((element, index) => {
      element.position = index + 1;
      element.isLossDisabled = false;
      element.isTargetDisabled = false;
    });

    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA
    );
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA
    );
  }

  inputTargetValue(element: any) {
    if (element.target1 && element.target1 !== 0) {
      element.isLossDisabled = true;
    } else {
      element.isLossDisabled = false;
    }
  }
  inputLossValue(element: any) {
    if (element.loss && element.loss !== 0) {
      element.isTargetDisabled = true;
    } else {
      element.isTargetDisabled = false;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  onBookTrade() {
    // update dataSource in service
    this.tradePlanService.dataArraySubject.next(this.dataSource.data);

    console.log('this.dataSource.data', this.dataSource.data);
  }

  ngOnDestroy() {}
}
