import { Component } from '@angular/core';
import { TradeInfoComponent } from './trade-info/trade-info.component';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [TradeInfoComponent],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss',
})
export class JournalComponent {}
