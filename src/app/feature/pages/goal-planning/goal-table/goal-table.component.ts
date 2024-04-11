import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideClientHydration } from '@angular/platform-browser';
import { TradePlanService } from '../../../services/trade-plan.service';

@Component({
  selector: 'app-goal-table',
  standalone: true,

  imports: [MatTableModule, MatPaginatorModule, DatePipe],
  templateUrl: './goal-table.component.html',
  styleUrl: './goal-table.component.scss',
})
export class GoalTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'date',
    'openingCapital',
    'capitalIntroduced',
    'roi',
    'profit',
    'withdrawn',
    'closingCapital',
    'actualClosingCapital',
  ];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  settingsData: PeriodicElement[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tradePlanService: TradePlanService) {
    this.ELEMENT_DATA = [];
    this.tradePlanService.settingsData$.subscribe((data) => {
      // increment the position value

      if (Object.keys(data).length !== 0) {
        this.ELEMENT_DATA.push({
          date: data?.date,
          position: data.position + 1,
          openingCapital: data?.openingCapital,
          capitalIntroduced: data?.capitalIntroduced,
          roi: data?.roi,
          profit: data?.profit,
          withdrawn: data?.withdrawn,
          closingCapital: data?.closingCapital,
          actualClosingCapital: data?.actualClosingCapital,
        });
      }

      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    });
  }
  ngOnInit() {
    this.tradePlanService.selectedRowData$.subscribe((data: any) => {
      // ...

      const index = this.tradePlanService.selectedRowIndex;
      if (index !== -1) {
        // Update the selected row and all the rows below it
        for (let i = index; i < this.ELEMENT_DATA.length; i++) {
          // Apply the business logic from setting.component.ts here
          this.ELEMENT_DATA[i] = {
            ...this.ELEMENT_DATA[i],
            openingCapital: this.updateCapitalValues(
              data,
              this.ELEMENT_DATA[i]
            ), // Use the imported function
            capitalIntroduced: data.capitalIntroduced,
            roi: data.roi,
            profit: this.calculateProfit(data, this.ELEMENT_DATA[i]), // Use the imported function
            withdrawn: data.withdrawn,
            closingCapital: this.calculateClosingCapital(
              data,
              this.ELEMENT_DATA[i]
            ), // Use the imported function
            actualClosingCapital: this.calculateActualClosingCapital(
              data,
              this.ELEMENT_DATA[i]
            ), // Use the imported function
          };
        }
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
    });
    this.tradePlanService.updateTableData(this.ELEMENT_DATA);
    console.log(this.ELEMENT_DATA);
  }

  calculateOpeningCapital(data: PeriodicElement, row: PeriodicElement) {
    // previous month closing capital or actual closing capital is the next month opening capital
    return row.actualClosingCapital === 0
      ? row.closingCapital
      : row.actualClosingCapital;
  }

  calculateProfit(data: PeriodicElement, row: PeriodicElement) {
    // Calculate the profit
    const profit =
      ((row.openingCapital + data.capitalIntroduced) * data.roi) / 100;
    return profit;
  }

  calculateClosingCapital(data: PeriodicElement, row: PeriodicElement) {
    // Calculate the closing capital
    const closingCapital =
      row.openingCapital +
      data.capitalIntroduced +
      data.profit -
      data.withdrawn;
    return closingCapital;
  }

  calculateActualClosingCapital(data: PeriodicElement, row: PeriodicElement) {
    // Calculate the actual closing capital if it is not provided

    if (row.actualClosingCapital === 0) {
      return row.closingCapital;
    }

    return row.actualClosingCapital;
  }

  updateCapitalValues(data: PeriodicElement, row: PeriodicElement) {
    for (let i = 1; i < this.ELEMENT_DATA.length; i++) {
      const previousRow = this.ELEMENT_DATA[i - 1];
      const currentRow = this.ELEMENT_DATA[i];
      if (currentRow.position === row.position) {
        return this.calculateOpeningCapital(data, previousRow);
      }
    }
    return 0; // Add a default return value here
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClicked(row: any) {
    // get the row data on click table row
    //

    this.tradePlanService.selectedRowIndex = row.position - 1;
    this.tradePlanService.selectedRowData$.next(row);
  }
}

export interface PeriodicElement {
  date: string;
  position: number;
  openingCapital: number;
  capitalIntroduced: number;
  roi: number;
  profit: number;
  withdrawn: number;
  closingCapital: number;
  actualClosingCapital: number;
}
