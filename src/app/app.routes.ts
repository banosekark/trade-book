import { Routes } from '@angular/router';
import { PagesComponent } from './feature/pages/pages.component';
import { HomeComponent } from './feature/pages/home/home.component';
import { JournalComponent } from './feature/pages/journal/journal.component';
import { PositionsComponent } from './feature/pages/positions/positions.component';
import { GoalPlanningComponent } from './feature/pages/goal-planning/goal-planning.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'journal', component: JournalComponent },
      { path: 'positions', component: PositionsComponent },
      { path: 'goal-planning', component: GoalPlanningComponent },
    ],
  },
];
