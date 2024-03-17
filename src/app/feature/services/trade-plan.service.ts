import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradePlanService {
  tradeCalculatedData = new BehaviorSubject<any>(null);
  constructor() {}
}
