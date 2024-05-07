import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { TradePlanService } from '../../../services/trade-plan.service';

@Component({
  selector: 'app-goal-table',
  standalone: true,

  imports: [MatTableModule, MatPaginatorModule, DatePipe, FormsModule],
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
    this.tradePlanService.getDataArray().subscribe((data) => {
      this.populateTableData(data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  populateTableData(dataArray: any[]) {
    // Initialize the first row

    // Populate the rest of the rows
    for (let i = 1; i < dataArray.length; i++) {
      // Set the opening capital of the current row to the actual closing capital of the previous row opening capital should not be NaN

      dataArray[i].openingCapital =
        this.ELEMENT_DATA[i - 1].actualClosingCapital;

      dataArray[i].capitalIntroduced = dataArray[i].capitalIntroduced || 0;
      dataArray[i].withdrawn = dataArray[i].withdrawn || 0;
      dataArray[i].roi = dataArray[i].roi || 0;
      dataArray[i].profit = dataArray[i].profit || 0;
      dataArray[i].closingCapital = dataArray[i].closingCapital || 0;

      dataArray[i].profit = Math.round(
        ((dataArray[i].openingCapital + dataArray[i].capitalIntroduced) *
          Number(String(dataArray[i].roi).split('%')[0])) /
          100
      );

      dataArray[i].closingCapital =
        dataArray[i].openingCapital +
        dataArray[i].capitalIntroduced +
        dataArray[i].profit -
        dataArray[i].withdrawn;

      dataArray[i].actualClosingCapital = dataArray[i].closingCapital;

      // Add the current row to the ELEMENT_DATA array
      this.ELEMENT_DATA[i] = dataArray[i];
    }

    // Update the data source
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }

  updateActualClosingCapital(newCapital: any, rowIndex: number) {
    // Convert newCapital to a number
    newCapital = Number(newCapital);
    let currentRoi;

    // Create a copy of the data array
    let updatedData = [...this.dataSource.data];

    // Update the actual closing capital of the selected row
    updatedData[rowIndex].actualClosingCapital = newCapital;

    // Update all rows below the selected row
    for (let i = rowIndex + 1; i < updatedData.length; i++) {
      // Convert values to numbers
      updatedData[i].openingCapital = Number(updatedData[i].openingCapital);
      updatedData[i].capitalIntroduced = Number(
        updatedData[i].capitalIntroduced
      );

      // get first number in roi string
      currentRoi = Number(String(updatedData[i].roi).split('%')[0]) / 100;

      // Set the opening capital of the current row to the actual closing capital of the previous row
      updatedData[i].openingCapital = newCapital;
      updatedData[i].profit = Math.round(
        (updatedData[i].openingCapital + updatedData[i].capitalIntroduced) *
          currentRoi
      );

      // Calculate the new closing capital based on your logic
      // For example, if the closing capital is the opening capital plus the profit
      updatedData[i].closingCapital =
        updatedData[i].openingCapital +
        updatedData[i].capitalIntroduced +
        updatedData[i].profit;

      // Update the actual closing capital for the next iteration
      newCapital = updatedData[i].closingCapital;

      updatedData[i].actualClosingCapital = newCapital;
    }

    // Assign the updated data to the data source
    this.dataSource.data = updatedData;
  }

  updateCapitalIntroduced(newCapital: any, rowIndex: number) {
    // Convert newCapital to a number
    newCapital = Number(newCapital);
    let currentRoi;
    // Create a copy of the data array
    let updatedData = [...this.dataSource.data];

    // Update the capital introduced of the selected row
    updatedData[rowIndex].capitalIntroduced = newCapital;

    // Update all rows below the selected row
    for (let i = rowIndex; i < updatedData.length; i++) {
      // Convert values to numbers
      updatedData[i].openingCapital = Number(updatedData[i].openingCapital);

      // get first number in roi string
      currentRoi = Number(String(updatedData[i].roi).split('%')[0]) / 100;

      updatedData[i].profit = Math.round(
        (updatedData[i].openingCapital + newCapital) * currentRoi
      );

      // Calculate the new closing capital based on your logic
      // For example, if the closing capital is the opening capital plus the profit
      updatedData[i].closingCapital =
        updatedData[i].openingCapital + updatedData[i].profit + newCapital;

      // Update the actual closing capital for the next iteration
      newCapital = updatedData[i].closingCapital;

      updatedData[i].actualClosingCapital = newCapital;
    }

    // Assign the updated data to the data source
    this.dataSource.data = updatedData;
    this.populateTableData(this.dataSource.data);
  }

  updateWithdrawn(newCapital: any, rowIndex: number) {
    // Convert newCapital to a number
    newCapital = Number(newCapital);
    let currentRoi;
    // Create a copy of the data array
    let updatedData = [...this.dataSource.data];

    // Update the withdrawn of the selected row
    updatedData[rowIndex].withdrawn = newCapital;
    updatedData[rowIndex].closingCapital =
      updatedData[rowIndex].openingCapital +
      updatedData[rowIndex].profit +
      updatedData[rowIndex].capitalIntroduced -
      newCapital;

    // Update all rows below the selected row
    for (let i = rowIndex; i < updatedData.length; i++) {
      // Convert values to numbers
      updatedData[i].openingCapital = Number(updatedData[i].openingCapital);
      updatedData[i].capitalIntroduced === undefined
        ? (updatedData[i].capitalIntroduced = 0)
        : updatedData[i].capitalIntroduced;
      updatedData[i].withdrawn === undefined
        ? (updatedData[i].withdrawn = 0)
        : updatedData[i].withdrawn;

      // get first number in roi string
      currentRoi = Number(String(updatedData[i].roi).split('%')[0]) / 100;

      updatedData[i].profit = Math.round(
        (updatedData[i].openingCapital + updatedData[i].capitalIntroduced) *
          currentRoi
      );

      // Calculate the new closing capital based on your logic
      // For example, if the closing capital is the opening capital plus the profit
      updatedData[i].closingCapital =
        updatedData[i].openingCapital +
        updatedData[i].profit +
        updatedData[i].capitalIntroduced -
        updatedData[i].withdrawn;

      // Update the actual closing capital for the next iteration
      updatedData[i].actualClosingCapital = updatedData[i].closingCapital;
    }

    // Assign the updated data to the data source
    this.dataSource.data = updatedData;
    this.populateTableData(this.dataSource.data);
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
