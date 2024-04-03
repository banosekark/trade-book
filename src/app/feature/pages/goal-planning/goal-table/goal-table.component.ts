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
    this.tradePlanService.selectedRowData$.subscribe(() => {
      this.dataSource._updateChangeSubscription(); // Refresh the table
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClicked(row: any) {
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
