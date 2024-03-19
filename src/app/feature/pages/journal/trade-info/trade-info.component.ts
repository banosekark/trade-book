import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TradePlanService } from '../../../services/trade-plan.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trade-info',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, DatePipe],
  templateUrl: './trade-info.component.html',
  styleUrl: './trade-info.component.scss',
})
export class TradeInfoComponent {
  displayedColumns: string[] = [
    'date',
    'number',
    'stockName',
    'tradeType',
    'strategyName',
    'entry',
    'sL',
    'target1',
    'target2',
    'tradeResult',
    'rulesFollowed',
  ];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  calculatorData: any;

  constructor(private tradePlanService: TradePlanService) {
    this.tradePlanService.tradeCalculatedData.subscribe((data: any) => {
      this.calculatorData = data;
      console.log('Trade Calculated Data:', this.calculatorData);
      // this.ELEMENT_DATA.push(this.calculatorData);
      this.ELEMENT_DATA.push({
        ...this.calculatorData,
        position: this.ELEMENT_DATA.length + 1,
      });

      // update the dataSource
      this.dataSource.data = this.ELEMENT_DATA;
      console.log('dataSource:', this.dataSource);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  // items: GithubIssue[];
  date: string;
  number: number;
  stockName: string;
  tradeType: string;
  strategyName: string;
  entry: string;
  sL: string;
  target1: string;
  target2: string;
  tradeResult: string;
  rulesFollowed: string;
}
