import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
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
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', entry: 300, weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', entry: 300, weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', entry: 300, weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', entry: 300, weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', entry: 300, weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', entry: 300, weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', entry: 300, weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', entry: 300, weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', entry: 300, weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', entry: 300, weight: 20.1797, symbol: 'Ne' },
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
export class TradePositionsComponent {
  value = 'Clear me';
  displayedColumns: string[] = ['select', 'name', 'entry', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
