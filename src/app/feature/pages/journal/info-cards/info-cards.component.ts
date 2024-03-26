import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-cards',
  standalone: true,
  imports: [MatIconModule, MatCardModule],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.scss',
})
export class InfoCardsComponent {}
