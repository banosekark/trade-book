import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export interface PeriodicElement {
  name: string;
  position: number;
  entry: number;
  stopLoss: number;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', entry: 300, stopLoss: 1.0079, actions: '' },
  { position: 2, name: 'Helium', entry: 300, stopLoss: 4.0026, actions: '' },
  { position: 3, name: 'Lithium', entry: 300, stopLoss: 6.941, actions: '' },
  {
    position: 4,
    name: 'Beryllium',
    entry: 300,
    stopLoss: 9.0122,
    actions: '',
  },
  { position: 5, name: 'Boron', entry: 300, stopLoss: 10.811, actions: '' },
  { position: 6, name: 'Carbon', entry: 300, stopLoss: 12.0107, actions: '' },
  {
    position: 7,
    name: 'Nitrogen',
    entry: 300,
    stopLoss: 14.0067,
    actions: '',
  },
  { position: 8, name: 'Oxygen', entry: 300, stopLoss: 15.9994, actions: '' },
  {
    position: 9,
    name: 'Fluorine',
    entry: 300,
    stopLoss: 18.9984,
    actions: 'F',
  },
  { position: 10, name: 'Neon', entry: 300, stopLoss: 20.1797, actions: '' },
];
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
  entryValue!: number;
  slValue!: number;
  displayedColumns: string[] = [
    'select',
    'name',
    'entry',
    'stopLoss',
    'actions',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  ngOnInit() {
    this.dataSource.data.forEach((element) => {
      this.entryValue = element.entry;
      this.slValue = element.stopLoss;
    });
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
}
