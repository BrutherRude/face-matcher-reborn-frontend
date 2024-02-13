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
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
    this.token = localStorage.getItem(this.tokenKey);
  }

  private _token: string | null = null;

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
    if (value) {
      localStorage.setItem(this.tokenKey, value);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  login(user: IAuthRequest): Observable<IAuthResponse> {
    const options = { headers: new HttpHeaders({ 'skipAuthCheck': 'true' }) };
    return this.http.post<IAuthResponse>(`${this.apiService.apiUrl}/user/login`, user, options);
  }

  logout() {
    this.token = null;
    this.router.navigate(['/', 'auth']);
  }
}
