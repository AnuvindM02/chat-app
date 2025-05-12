import { Component } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { ContactCardComponent } from "../contact-card/contact-card.component";

@Component({
  selector: 'app-contacts-section',
  imports: [LucideAngularModule, ContactCardComponent],
  templateUrl: './contacts-section.component.html',
  styleUrl: './contacts-section.component.css'
})
export class ContactsSectionComponent {
readonly search = Search;
users = [
    { name: 'John Doe', email: 'johndoe@example.com' },
    { name: 'Jane Smith', email: 'janesmith@example.com' },
    { name: 'Alice Brown', email: 'alicebrown@example.com' },
    { name: 'Bob Johnson', email: 'bobjohnson@example.com' },
    { name: 'John Doe', email: 'johndoe@example.com' },
    { name: 'Jane Smith', email: 'janesmith@example.com' },
    { name: 'Alice Brown', email: 'alicebrown@example.com' },
    { name: 'Bob Johnson', email: 'bobjohnson@example.com' },
    { name: 'John Doe', email: 'johndoe@example.com' },
    { name: 'Jane Smith', email: 'janesmith@example.com' },
    { name: 'Alice Brown', email: 'alicebrown@example.com' },
    { name: 'Bob Johnson', email: 'bobjohnson@example.com' },
    { name: 'John Doe', email: 'johndoe@example.com' },
    { name: 'Jane Smith', email: 'janesmith@example.com' },
    { name: 'Alice Brown', email: 'alicebrown@example.com' },
    { name: 'Bob Johnson', email: 'bobjohnson@example.com' }
  ];
}
