import { Component, computed, input } from '@angular/core';
import { AddUserToContactRequest } from '../../../models/chat/add-user-to-contact-request';
import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  constructor(private chatService: ChatService) { }

  userId = input.required<number | undefined>();
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

  addUserToContact(userId: number | undefined) {
    if (userId === undefined)
      return;

    const currentUserId: number = parseInt(localStorage.getItem('user_id') || '0');

    if (currentUserId === 0) {
      console.error('Current user ID is not set.');
      return;
    }
    const request: AddUserToContactRequest = {
      user1Id: userId,
      user2Id: currentUserId
    };

    this.chatService.addUserToContact(request).subscribe({
      next: (response: string) => {
      },
      error: (error) => {
        console.error('Error adding user to contacts:', error);
      }
    });

  }
}