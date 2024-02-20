import { Component } from '@angular/core';
import { NavbarComponent } from '../../themes/components/navbar/navbar.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent {}
