import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../../models/chat/chat-message';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddUserToContactRequest } from '../../models/chat/add-user-to-contact-request';
import { GetUsersRequest } from '../../models/auth/get-users-request';
import { ContactsListDto } from '../../models/chat/contacts-list-dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection | null = null;
  private readonly messageSubject = new BehaviorSubject<ChatMessage | null>(null);
  public readonly message$ = this.messageSubject.asObservable();
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addUserToContact(data: AddUserToContactRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/chat/conversations/p2p`, data);
  }

  getAllContacts(data: GetUsersRequest): Observable<ContactsListDto> {
    let params = new HttpParams();
    Object.keys(data).forEach(key => {
      const typedKey = key as keyof GetUsersRequest;
      if (data[typedKey] !== undefined && data[typedKey] !== null) {
        params = params.set(key, data[typedKey] as string);
      }
    });
    return this.http.get<ContactsListDto>(`${this.baseUrl}/chat/conversations`, { params });
  }

  getMessages(conversationId: string, cursor?: string, limit: number =5): Observable<ChatMessage[]> {
    let params = new HttpParams();
    params = params.set('limit', limit.toString());
    if (cursor) {
      params = params.set('cursor', cursor);
    }
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/chat/conversations/${conversationId}/messages`,{ params });
  }

  startConnection(token: string): void {
    if (this.hubConnection) return; //For avoiding duplicate connection

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`http://localhost:7002/api/chat-hub`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection.start()
      .then(() =>
        console.log('SignalR connection started'))
      .catch(err => console.error('SignalR connection error:', err));

    this.hubConnection.on('ReceiveMessage', (userId: string,message: ChatMessage) => {
      this.messageSubject.next(message);
    });
  }

  joinConversation(conversationId: string): void {
    if (!this.hubConnection) {
      console.error('Hub connection is not established.');
      return;
    }

    this.hubConnection.invoke('JoinConversation', conversationId)
      .then(() => console.log(`Joined conversation: ${conversationId}`))
      .catch(err => console.error(`Error joining conversation ${conversationId}:`, err));
  }

  leaveConversation(conversationId: string): void {
    if (!this.hubConnection) {
      console.error('Hub connection is not established.');
      return;
    }

    this.hubConnection.invoke('LeaveConversation', conversationId)
      .then(() => console.log(`Left conversation: ${conversationId}`))
      .catch(err => console.error(`Error leaving conversation ${conversationId}:`, err));
  }

  sendMessage(message: ChatMessage): void {
    console.log('Sending message:', message);
    this.hubConnection?.invoke('SendPrivateMessage', message)
  }
}
