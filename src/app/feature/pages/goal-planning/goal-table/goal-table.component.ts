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
  settingsData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tradePlanService: TradePlanService) {
    this.tradePlanService.getSettingsData().subscribe((data) => {
      this.settingsData = data;
      this.settingsData.forEach((element: any, index: number) => {
        this.ELEMENT_DATA.push({
          position: index + 1,
          date: element.date,
          openingCapital: element.openingCapital,
          capitalIntroduced: element.capitalIntroduced,
          roi: element.roi,
          profit: element.profit,
          withdrawn: element.withdrawn,
          closingCapital: element.closingCapital,
          actualClosingCapital: element.actualClosingCapital,
        });
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(
        this.ELEMENT_DATA
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  date: Date;
  position: number;
  openingCapital: number;
  capitalIntroduced: number;
  roi: number;
  profit: number;
  withdrawn: number;
  closingCapital: number;
  actualClosingCapital: number;
}
