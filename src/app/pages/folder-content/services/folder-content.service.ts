import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { IContentResponse } from 'src/app/components/content/interfaces/response/content-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FolderContentService {


  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {}

  getContents(folderId: string): Observable<IContentResponse[]> {
    return this.http.get<IContentResponse[]>(`${this.apiService.apiUrl}/folder-content/list/${folderId}`);
  } 


}
