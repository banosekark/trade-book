import { Component, OnInit } from '@angular/core';
import { TradePositionsComponent } from './trade-positions/trade-positions.component';
import { TradeCalculatorComponent } from '../trade-calculator/trade-calculator.component';
import { MatCardModule } from '@angular/material/card';
import { TradePlanService } from '../../services/trade-plan.service';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [TradePositionsComponent, TradeCalculatorComponent, MatCardModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss',
})
export class PositionsComponent implements OnInit {
  tradeCalculatorData: any;

  constructor(private tradePlanService: TradePlanService) {}

  ngOnInit() {}
}
