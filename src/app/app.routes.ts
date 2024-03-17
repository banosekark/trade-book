import { Routes } from '@angular/router';
import { PagesComponent } from './feature/pages/pages.component';
import { HomeComponent } from './feature/pages/home/home.component';
import { JournalComponent } from './feature/pages/journal/journal.component';
import { SettingComponent } from './feature/pages/setting/setting.component';
import { PositionsComponent } from './feature/pages/positions/positions.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'journal', component: JournalComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'positions', component: PositionsComponent },
    ],
  },
];
