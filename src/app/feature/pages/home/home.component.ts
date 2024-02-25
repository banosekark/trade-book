import { Component } from '@angular/core';
import { TradeCalculatorComponent } from '../trade-calculator/trade-calculator.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TradeCalculatorComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['app', 'purple'];
    dialogConfig.data = {
      width: '500px',
      data: { title: 'My title' },
    };
    this.dialog.open(TradeCalculatorComponent, dialogConfig);
  }
}
