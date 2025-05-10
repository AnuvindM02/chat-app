import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, MessageCircle, User, Settings, UserRoundSearch, Bell } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly messageCircle = MessageCircle;
  readonly user = User;
  readonly settings = Settings;
  readonly userRoundSearch = UserRoundSearch;
  readonly bell = Bell;
  hovered: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigate(path:string){
    this.router.navigate([path], {relativeTo: this.route});
  }
}
