import { Injectable } from '@angular/core';
import { const$ } from './core/constant/constant';

export class Settings {
  constructor(public name: string, public theme: string) {}
}

@Injectable()
export class AppSettings {
  public settings = new Settings(
    const$.appName, // theme name
    const$.skins.purple // green, blue, red, pink, purple, grey
  );
}
