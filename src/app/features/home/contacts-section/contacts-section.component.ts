import { Component, effect, signal } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { ContactCardComponent } from "../contact-card/contact-card.component";
import { AuthService } from '../../../core/services/auth.service';
import { GetUsersRequest } from '../../../models/auth/get-users-request';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ChatWindowComponent } from "../chat-window/chat-window.component";
import { ChatService } from '../../../core/services/chat.service';
import { ContactDto } from '../../../models/chat/contact-dto';

@Component({
  selector: 'app-contacts-section',
  imports: [LucideAngularModule, ContactCardComponent, ChatWindowComponent],
  templateUrl: './contacts-section.component.html',
  styleUrl: './contacts-section.component.css'
})
export class ContactsSectionComponent {
  readonly search = Search;
  selectedUserId = signal<string | null>(null);
  receipmentName = signal<string | null>(null);

  onUserSelected(data:{conversationId: string, email: string; name: string;}) {
    this.selectedUserId.set(data.conversationId);
    this.receipmentName.set(data.name);
  }

  searchTerm = signal('');
  private pageSize = 15;
  private cursor = signal<Date | null>(null);
  readonly users = signal<ContactDto[]>([]);
  readonly isLoading = signal(false);

  constructor(private authService: AuthService, private chatService: ChatService) {
    toObservable(this.searchTerm)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.resetAndLoadUsers();
        })
      )
      .subscribe();
  }


  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  loadMore() {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    const getUsersRequest: GetUsersRequest = {
      limit: this.pageSize,
      cursor: this.cursor()?.toISOString() || '',
      search: this.searchTerm()
    }

    this.chatService.getAllContacts(getUsersRequest).pipe(
      tap(response => {
        this.cursor.set(new Date(response.nextCursor ? response.nextCursor : ''));
        this.users.update(users => [...users, ...response.users]);
        this.isLoading.set(false);
      })
    ).subscribe();;


  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      this.loadMore();
    }
  }

  private resetAndLoadUsers() {
    this.cursor.set(null);
    this.users.set([]);
    this.loadMore();
  }
}
