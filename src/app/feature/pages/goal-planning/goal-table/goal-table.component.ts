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
    for (let i = 1; i < dataArray.length; i++) {
      const previousRow = this.ELEMENT_DATA[i - 1];

      dataArray[i].openingCapital = previousRow.actualClosingCapital || 0;
      dataArray[i].capitalIntroduced = dataArray[i].capitalIntroduced || 0;
      dataArray[i].withdrawn = dataArray[i].withdrawn || 0;
      dataArray[i].roi = dataArray[i].roi || 0;
      dataArray[i].profit = dataArray[i].profit || 0;
      dataArray[i].closingCapital = dataArray[i].closingCapital || 0;

      const roiPercentage = Number(String(dataArray[i].roi).split('%')[0]);
      dataArray[i].profit = Math.round(
        ((dataArray[i].openingCapital + dataArray[i].capitalIntroduced) *
          roiPercentage) /
          100
      );

      dataArray[i].closingCapital =
        dataArray[i].openingCapital +
        dataArray[i].capitalIntroduced +
        dataArray[i].profit -
        dataArray[i].withdrawn;

      dataArray[i].actualClosingCapital = dataArray[i].closingCapital;
      this.ELEMENT_DATA[i] = dataArray[i];
    }
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }

  updateActualClosingCapital(newCapital: any, rowIndex: number) {
    newCapital = Number(newCapital);
    let currentRoi;
    let updatedData = [...this.dataSource.data];
    updatedData[rowIndex].actualClosingCapital = newCapital;
    for (let i = rowIndex + 1; i < updatedData.length; i++) {
      updatedData[i].openingCapital = Number(updatedData[i].openingCapital);
      updatedData[i].capitalIntroduced = Number(
        updatedData[i].capitalIntroduced
      );
      currentRoi = Number(String(updatedData[i].roi).split('%')[0]) / 100;
      updatedData[i].openingCapital = newCapital;
      updatedData[i].profit = Math.round(
        (updatedData[i].openingCapital + updatedData[i].capitalIntroduced) *
          currentRoi
      );
      updatedData[i].closingCapital =
        updatedData[i].openingCapital +
        updatedData[i].capitalIntroduced +
        updatedData[i].profit;
      newCapital = updatedData[i].closingCapital;
      updatedData[i].actualClosingCapital = newCapital;
    }
    this.dataSource.data = updatedData;
  }

  updateCapitalIntroduced(newCapital: any, rowIndex: number) {
    newCapital = Number(newCapital);
    let currentRoi;
    let updatedData = [...this.dataSource.data];
    updatedData[rowIndex].capitalIntroduced = newCapital;
    for (let i = rowIndex; i < updatedData.length; i++) {
      updatedData[i].openingCapital = Number(updatedData[i].openingCapital);
      currentRoi = Number(String(updatedData[i].roi).split('%')[0]) / 100;

      updatedData[i].profit = Math.round(
        (updatedData[i].openingCapital + newCapital) * currentRoi
      );
      updatedData[i].closingCapital =
        updatedData[i].openingCapital + updatedData[i].profit + newCapital;
      newCapital = updatedData[i].closingCapital;

      updatedData[i].actualClosingCapital = newCapital;
    }
    this.dataSource.data = updatedData;
    this.populateTableData(this.dataSource.data);
  }

  updateWithdrawn(newCapital: any, rowIndex: number) {
    newCapital = Number(newCapital);
    let currentRoi;
    let updatedData = [...this.dataSource.data];
    updatedData[rowIndex].withdrawn = newCapital;
    updatedData[rowIndex].closingCapital =
      updatedData[rowIndex].openingCapital +
      updatedData[rowIndex].profit +
      updatedData[rowIndex].capitalIntroduced -
      newCapital;
    for (let i = rowIndex; i < updatedData.length; i++) {
      updatedData[i].openingCapital = Number(updatedData[i].openingCapital);
      updatedData[i].capitalIntroduced ||= 0;
      updatedData[i].withdrawn ||= 0;
      currentRoi = Number(String(updatedData[i].roi).split('%')[0]) / 100;

      updatedData[i].profit = Math.round(
        (updatedData[i].openingCapital + updatedData[i].capitalIntroduced) *
          currentRoi
      );
      updatedData[i].closingCapital =
        updatedData[i].openingCapital +
        updatedData[i].profit +
        updatedData[i].capitalIntroduced -
        updatedData[i].withdrawn;
      updatedData[i].actualClosingCapital = updatedData[i].closingCapital;
    }
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
