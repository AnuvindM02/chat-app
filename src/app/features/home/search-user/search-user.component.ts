import { Component, signal } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { ContactCardComponent } from "../contact-card/contact-card.component";
import { UserDto } from '../../../models/auth/user-dto';
import { AuthService } from '../../../core/services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { GetUsersRequest } from '../../../models/auth/get-users-request';

@Component({
  selector: 'app-search-user',
  imports: [LucideAngularModule, ContactCardComponent],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {
  readonly search = Search;
  
    searchTerm = signal('');
  private pageSize = 15;
  private cursor = signal<Date | null>(null);
  readonly users = signal<UserDto[]>([]);
  readonly isLoading = signal(false);

  constructor(private authService: AuthService) {
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

    this.authService.getAllUsers(getUsersRequest).pipe(
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
