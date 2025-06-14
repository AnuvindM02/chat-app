import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../models/auth/login-request';
import { LoginResponse } from '../../models/auth/login-response';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../models/auth/register-request';
import { GetUsersRequest } from '../../models/auth/get-users-request';
import { GetUsersResponse } from '../../models/auth/get-users-response';
import { RegisterResponse } from '../../models/auth/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authApiBaseUrl = environment.baseUrl;
  public isAuthenticated: boolean = false;
  public userId: number | null = null;
  public currentUserName: string | null = null;
  public loginResponse: LoginResponse | null = null;
  public registerResponse: RegisterResponse | null = null;

  constructor(private http: HttpClient) {
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authApiBaseUrl}/authentication/login`, data);
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.authApiBaseUrl}/users/register`, data);
  }

  setAuthStatus(loginResponse: LoginResponse): void {
    this.isAuthenticated = true;
    this.loginResponse = loginResponse;
    localStorage.setItem('access_token', loginResponse.token);
    //localStorage.setItem('refresh_token', loginResponse.refreshToken);
    localStorage.setItem('user_id', loginResponse.userId.toString());
  }
  
  setRegisterAuthStatus(responseResponse: RegisterResponse): void {
    this.isAuthenticated = true;
    this.registerResponse = responseResponse;
    localStorage.setItem('access_token', responseResponse.token);
    //localStorage.setItem('refresh_token', loginResponse.refreshToken);
    localStorage.setItem('user_id', responseResponse.userId.toString());
  }

  logout(): void {
    this.isAuthenticated = false;
    this.loginResponse = null;
    localStorage.removeItem('access_token');
    //localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
  }

  getAllUsers(data: GetUsersRequest): Observable<GetUsersResponse> {
    let params = new HttpParams();
    Object.keys(data).forEach(key => {
      const typedKey = key as keyof GetUsersRequest;
      if (data[typedKey] !== undefined && data[typedKey] !== null) {
        params = params.set(key, data[typedKey] as string);
      }
    });
    return this.http.get<GetUsersResponse>(`${this.authApiBaseUrl}/users/getAll`, { params });
  }
}
