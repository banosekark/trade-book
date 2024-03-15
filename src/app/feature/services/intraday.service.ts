import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IntraDayService {
  constructor() {}

  // get riskPoint
  getRiskPoint(entry: any, stopLoss: number): any {
    const riskValue = Math.abs(entry - stopLoss).toFixed(2);
    return riskValue;
  }

  // get riskAmount
  getRiskAmount(quantity: number, riskPoint: number): number {
    const riskAmount = quantity * riskPoint;
    return riskAmount;
  }

  //get targetPrice
  getTargetPrice(entry: number, riskValue: number): number[] {
    const targetPrice2 = entry - riskValue * 2;
    const targetPrice3 = entry - riskValue * 3;
    return [targetPrice2, targetPrice3];
  }

  // get reward possible
  getRewardPossible(entry: number, riskAmount: number): number[] {
    const rewardPossible2 = riskAmount * 2;
    const rewardPossible3 = riskAmount * 3;
    return [rewardPossible2, rewardPossible3];
  }

  // get riskPerTrade
  getRiskPerTrade(totalCapital: number): number {
    const riskPerTrade = totalCapital * 0.005;
    return riskPerTrade;
  }

  // get quantity
  getQuantity(entry: number, riskPoint: number, totalCapital: number) {
    const noOfShares = Math.min(
      Math.round((totalCapital * 0.005) / riskPoint),
      Math.round((totalCapital * 2.5) / entry)
    );
    return noOfShares;
  }

  // get capital required
  getCapitalRequired(entry: number, quantity: number): number {
    const capitalRequired = Math.round(quantity * (entry / 5));
    return capitalRequired;
  }

  // get capital required
  getPercentageOfCapital(
    capitalRequiredValue: number,
    totalCapital: number
  ): string {
    const percentageOfCapital = (
      (capitalRequiredValue / totalCapital) *
      100
    ).toFixed(2);
    return percentageOfCapital;
  }
}
