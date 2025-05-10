import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { ContactsSectionComponent } from './contacts-section/contacts-section.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, ContactsSectionComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
