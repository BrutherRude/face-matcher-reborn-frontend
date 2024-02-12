import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { IAuthRequest } from '../interfaces/request/auth-request.interface';
import { IAuthResponse } from '../interfaces/response/auth-response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {}

  private token: string | null = null;

  login(user: IAuthRequest): Observable<IAuthResponse> {
    const options = { headers: new HttpHeaders({ 'skipAuthCheck': 'true' }) };
    return this.http.post<IAuthResponse>(`${this.apiService.apiUrl}/user/login`, user, options);
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  logout() {
    this.setToken(null);
    this.router.navigate(['/', 'auth']);

  }
}
