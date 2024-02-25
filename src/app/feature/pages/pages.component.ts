import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../themes/components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppSettings, Settings } from '../../app.setting';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [NavbarComponent, HomeComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent implements OnInit {
  public settings: Settings;

  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    setTimeout(() => {
      this.settings.theme = 'purple';
    });
  }
}
