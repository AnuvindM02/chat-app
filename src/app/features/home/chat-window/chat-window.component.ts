import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { CircleUserRound, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-chat-window',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {
  readonly circleUserRound = CircleUserRound;
  userId = 1;
  messages = [
    {
      id: 1,
      userId: 1,
      content: 'Hello, how are you?',
      timestamp: new Date('2023-10-01T10:00:00Z')
    },
    {
      id: 2,
      userId: 2,
      content: 'I am fine, thank you! How about you?',
      timestamp: new Date('2023-10-01T10:01:00Z')
    },
    {
      id: 3,
      userId: 1,
      content: 'I am doing well, thanks for asking!',
      timestamp: new Date('2023-10-01T10:02:00Z')
    },
    {
      id: 4,
      userId: 2,
      content: 'Great to hear! Do you have any plans for the weekend?',
      timestamp: new Date('2023-10-01T10:03:00Z')
    },
    {
      id: 5,
      userId: 1,
      content: 'Yes, I am planning to go hiking. What about you?',
      timestamp: new Date('2023-10-01T10:04:00Z')
    },
    {
      id: 6,
      userId: 2,
      content: 'I might just relax at home and catch up on some reading.',
      timestamp: new Date('2023-10-01T10:05:00Z')
    },
    {
      id: 7,
      userId: 1,
      content: 'That sounds nice! Any book recommendations?',
      timestamp: new Date('2023-10-01T10:06:00Z')
    },
    {
      id: 8,
      userId: 2,
      content: 'I recently read "The Alchemist" by Paulo Coelho. It was fantastic!',
      timestamp: new Date('2023-10-01T10:07:00Z')
    },
    {
      id: 9,
      userId: 1,
      content: 'I love that book! I might read it again this weekend.',
      timestamp: new Date('2023-10-01T10:08:00Z')
    },
    {
      id: 10,
      userId: 2,
      content: 'You should! It’s a great read.',
      timestamp: new Date('2023-10-01T10:09:00Z')
    },
    {
      id: 11,
      userId: 1,
      content: 'Thanks for the recommendation! Let’s catch up later.',
      timestamp: new Date('2023-10-01T10:10:00Z')
    },
    {
      id: 12,
      userId: 2,
      content: 'Sure, have a great day❤️!',
      timestamp: new Date('2023-10-01T10:11:00Z')
    },
    {
      id: 13,
      userId: 1,
      content: 'You too! Bye!',
      timestamp: new Date('2023-10-01T10:12:00Z')
    },
    {
      id: 14,
      userId: 2,
      content: 'Bye!',
      timestamp: new Date('2023-10-01T10:13:00Z')
    }
  ];
}
