import { NgClass } from '@angular/common';
import { Component, effect, ElementRef, input, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { CircleUserRound, LucideAngularModule } from 'lucide-angular';
import { ChatService } from '../../../core/services/chat.service';
import { ChatMessage } from '../../../models/chat/chat-message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  readonly messageText = signal('');
  readonly circleUserRound = CircleUserRound;
  userId = Number(localStorage.getItem('user_id') || '0');
  conversationId = input.required<string>();
  recepientName = input.required<string>();
  readonly messages = signal<ChatMessage[]>([]);
  private sub?: Subscription;
  readonly isLoading = signal<boolean>(false);

  readonly chatService: ChatService;
  readonly token: string = localStorage.getItem('access_token') || '';

  public constructor(chatService: ChatService) {
    this.chatService = chatService;

    effect(() => {
      if (this.conversationId()) {
        this.loadMessages(this.conversationId());
      }
    });
  }

  private loadMessages(conversationId: string) {
    this.isLoading.set(true);
    this.chatService.getMessages(conversationId).subscribe({
      next: (msgs) => {
        this.messages.set(msgs.reverse());
        this.isLoading.set(false);
        this.scrollToBottom();
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  sendMessage() {
    const text = this.messageText().trim();
    if (!text) return;

    const message: ChatMessage = {
      conversationId: this.conversationId(),
      senderId: this.userId,
      text: text,
      timeStamp: new Date().toISOString(),
      senderMailId: ""
    };

    this.chatService.sendMessage(message);
    this.messages.update((msgs) => [...msgs, message]);
    this.messageText.set('');
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.chatService.leaveConversation(this.conversationId());
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.chatService.startConnection(this.token);
    this.chatService.joinConversation(this.conversationId());

    //subscribe to incoming messages
    this.sub = this.chatService.message$.subscribe((msg) => {
      if (msg?.conversationId == this.conversationId()) {
        this.messages.update((msgs) => [...msgs, msg]);
        this.scrollToBottom();
      }
    });

  }

  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLDivElement>;

  private scrollToBottom() {
  requestAnimationFrame(() => {
    if (this.scrollContainer) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  });
}
}
