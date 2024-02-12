import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserRegisterRequest } from '../interfaces/request/user-register-request.interface';
import { IUserRegisterResponse } from '../interfaces/response/user-register-response.interface';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {


  constructor(private http: HttpClient, private apiService: ApiService) {}

  registerUser(user: IUserRegisterRequest): Observable<IUserRegisterResponse> {
    const options = { headers: new HttpHeaders({ 'skipAuthCheck': 'true' }) };
    return this.http.post<IUserRegisterResponse>(`${this.apiService.apiUrl}/user`, user, options);
  }
}
