import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradePlanService {
  // Define a BehaviorSubject with an initial empty array
  dataArraySubject = new BehaviorSubject<any[]>([]);
  settingsDataSubject = new BehaviorSubject<any>({});
  settingsData$ = this.settingsDataSubject.asObservable();
  formData: any[] = [];
  settingsData: any[] = [];

  constructor() {}

  // Create a method to update the BehaviorSubject
  updateDataArray(data: any[]) {
    this.formData.push(data);
    console.log('this.formData', this.formData);
    this.dataArraySubject.next(this.formData);
  }

  // Create a method to get the BehaviorSubject value
  getDataArray() {
    return this.dataArraySubject.asObservable();
  }

  updateSettingsData(data: any) {
    // this.settingsData.push(data);
    this.settingsDataSubject.next(data);
  }

  getSettingsData() {
    return this.settingsDataSubject.asObservable();
  }
}
