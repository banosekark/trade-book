import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TradePlanService } from '../../../services/trade-plan.service';
import e from 'express';

export interface PeriodicElement {
  name: string;
  position: number;
  entry: number;
  stopLoss: number;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
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
  ],
  templateUrl: './trade-positions.component.html',
  styleUrl: './trade-positions.component.scss',
})
export class TradePositionsComponent implements OnInit {
  // entryValue!: number;
  // slValue!: number;
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'entry',
    'stopLoss',
    'actions',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  calculatorData: any;

  constructor(private tradePlanService: TradePlanService) {
    this.tradePlanService.tradeCalculatedData.subscribe((data: any) => {
      this.calculatorData = data;
      console.log('Trade Calculated Data:', this.calculatorData);
    });
    ELEMENT_DATA.push({
      name: this.calculatorData['autoComplete']['name'],
      entry: this.calculatorData['entry'],
      stopLoss: this.calculatorData.stopLoss,
      position: ELEMENT_DATA.length + 1,
      actions: '',
    });

    // update the dataSource
    this.dataSource.data = ELEMENT_DATA;
  }

  ngOnInit() {
    console.log('this.dataSource.data', this.dataSource.data);
    this.dataSource.data.forEach((element) => {});
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
    this.dataSource.data.forEach((element) => {
      console.log('element', element.entry);
      // update the dataSource value to tradePlanService tradeCalculatorData
      this.tradePlanService.updateTradeCalculatedData({
        name: element.name,
        entry: element.entry,
        stopLoss: element.stopLoss,
      });
    });
  }
}
