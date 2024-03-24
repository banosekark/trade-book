import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TradePlanService } from '../../../services/trade-plan.service';
import { DatePipe } from '@angular/common';
import e from 'express';

@Component({
  selector: 'app-trade-info',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, DatePipe],
  templateUrl: './trade-info.component.html',
  styleUrl: './trade-info.component.scss',
})
export class TradeInfoComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'date',
    'number',
    'stockName',
    'tradeType',
    'strategyName',
    'entry',
    'sL',
    'target1',
    'loss',
    'tradeResult',
    'rulesFollowed',
  ];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  calculatorData: any;

  constructor(private tradePlanService: TradePlanService) {
    this.tradePlanService.dataArraySubject.subscribe((data: any) => {
      this.calculatorData = data;
      console.log('this.calculatorDataIn-Trade-info', this.calculatorData);
    });

    this.ELEMENT_DATA = this.calculatorData;
    console.log('this.ELEMENT_DATA', this.ELEMENT_DATA);
    this.ELEMENT_DATA.forEach((element, index) => {
      element.position = index + 1;
    });

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
  }

  ngOnInit(): void {
    // this.ELEMENT_DATA = this.calculatorData;

    console.log('this.ELEMENT_DATA', this.ELEMENT_DATA);

    // push the data to the ELEMENT_DATA array
    // this.ELEMENT_DATA.push({

    // update the data source
    this.dataSource = new MatTableDataSource<PeriodicElement>(
      this.ELEMENT_DATA
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {}
}

export interface PeriodicElement {
  // items: GithubIssue[];
  date: string;
  stockName: string;
  tradeType: string;
  strategyName: string;
  entry: string;
  sL: string;
  target1: number;
  loss: number;
  tradeResult: string;
  rulesFollowed: string;
  position: number;
  actions: string;
}
