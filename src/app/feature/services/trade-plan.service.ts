import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradePlanService {
  // Define a BehaviorSubject with an initial empty array
  private dataArraySubject = new BehaviorSubject<any[]>([]);

  // Expose an observable to subscribers
  tradeCalculatedData = this.dataArraySubject.asObservable();
  tradeCalculatorData: any;

  constructor() {}

  // Define a method to update the BehaviorSubject
  updateTradeCalculatedData(data: any) {
    this.tradeCalculatorData = data;
    this.dataArraySubject.next(data);
  }

  // Define a method to get the BehaviorSubject value
  getTradeCalculatedData() {
    return this.tradeCalculatorData;
  }

  // Define a method to clear the BehaviorSubject
  clearTradeCalculatedData() {
    this.dataArraySubject.next([]);
  }
}
