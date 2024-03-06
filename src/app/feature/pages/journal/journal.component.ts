import { Component } from '@angular/core';
import { TradeInfoComponent } from './trade-info/trade-info.component';
import { TilesComponent } from './tiles/tiles.component';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [TradeInfoComponent, TilesComponent],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss',
})
export class JournalComponent {}
