import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  name = input.required<string | null>();
  email = input.required<string>();
  joinedDate = input.required<Date | undefined>();

  readonly joinedAgo = computed(() => {
    const utcDate = this.joinedDate();
    if (!utcDate) return 'N/A';

    const now = new Date();
    const joined = new Date(utcDate);
    const diffMs = now.getTime() - joined.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `Joined ${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `Joined ${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `Joined ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `Joined just now`;
  });
}