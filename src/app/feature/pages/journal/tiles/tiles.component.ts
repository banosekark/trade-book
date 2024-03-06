import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatIconModule],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.scss',
})
export class TilesComponent {}
