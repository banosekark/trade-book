import { Routes } from '@angular/router';
import { PagesComponent } from './feature/pages/pages.component';
import { HomeComponent } from './feature/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{ path: '', component: HomeComponent }],
  },
];
