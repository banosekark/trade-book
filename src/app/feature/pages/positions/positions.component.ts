import { Component } from '@angular/core';
import { TradePositionsComponent } from './trade-positions/trade-positions.component';
import { TradeCalculatorComponent } from '../trade-calculator/trade-calculator.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [TradePositionsComponent, TradeCalculatorComponent, MatCardModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss',
})
export class PositionsComponent {}
