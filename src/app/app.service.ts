import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserRequest } from './pages/register/interfaces/request/user-request.interface';
import { IUserResponse } from './pages/register/interfaces/response/user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private MAIN_API_URL = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  registerUser(user: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.MAIN_API_URL}/user`, user);
  }
}
