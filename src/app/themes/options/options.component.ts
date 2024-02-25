import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppSettings, Settings } from '../../app.setting';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent {
  public showOptions: boolean = false;
  public settings: Settings;
  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  public changeTheme(theme: any) {
    this.settings.theme = theme;
  }
}
