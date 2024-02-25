import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSettings, Settings } from './app.setting';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  settings: Settings;
  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }
  title = 'trade-book';
}
