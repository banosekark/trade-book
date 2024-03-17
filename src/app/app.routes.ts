import { Routes } from '@angular/router';
import { PagesComponent } from './feature/pages/pages.component';
import { HomeComponent } from './feature/pages/home/home.component';
import { JournalComponent } from './feature/pages/journal/journal.component';
import { SettingComponent } from './feature/pages/setting/setting.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'journal', component: JournalComponent },
      { path: 'setting', component: SettingComponent },
    ],
  },
];
