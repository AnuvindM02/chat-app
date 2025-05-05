import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../models/auth/login-request';
import { LoginResponse } from '../../models/auth/login-response';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../models/auth/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authApiBaseUrl = environment.authApiBaseUrl;
  public isAuthenticated: boolean = false;
  public userId: number | null = null;
  public currentUserName: string | null = null;
  public loginResponse: LoginResponse | null = null;

  constructor(private http: HttpClient) {
  }

  login(data: LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.authApiBaseUrl}/authentication/login`, data);
  }

  register(data: RegisterRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.authApiBaseUrl}/users/register`, data);
  }

  setAuthStatus(loginResponse: LoginResponse): void {
    this.isAuthenticated = true;
    this.loginResponse = loginResponse;
    localStorage.setItem('access_token', loginResponse.token);
    //localStorage.setItem('refresh_token', loginResponse.refreshToken);
    localStorage.setItem('user_id', loginResponse.userId.toString());
  }

  logout(): void {
    this.isAuthenticated = false;
    this.loginResponse = null;
    localStorage.removeItem('access_token');
    //localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
  }
}
