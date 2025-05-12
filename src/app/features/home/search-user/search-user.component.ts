import { Component } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { ContactCardComponent } from "../contact-card/contact-card.component";

@Component({
  selector: 'app-search-user',
  imports: [LucideAngularModule, ContactCardComponent],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {
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
