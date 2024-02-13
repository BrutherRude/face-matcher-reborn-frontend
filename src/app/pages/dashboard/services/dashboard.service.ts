import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { IFolderRequest } from '../../../components/folder/interfaces/request/folder-request.interface';
import { IFolderResponse } from '../../../components/folder/interfaces/response/folder-response.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {


  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {}

  createFolder(folder: IFolderRequest): Observable<IFolderResponse> {
    return this.http.post<IFolderResponse>(`${this.apiService.apiUrl}/folder`, folder);
  }

  getFolders(): Observable<IFolderResponse[]> {
    return this.http.get<IFolderResponse[]>(`${this.apiService.apiUrl}/folder/list`);
  } 


}
