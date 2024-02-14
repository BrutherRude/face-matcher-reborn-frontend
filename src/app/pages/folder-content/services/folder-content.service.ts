import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { IContentResponse } from 'src/app/components/content/interfaces/response/content-response.interface';
import { IFolderResponse } from 'src/app/components/folder/interfaces/response/folder-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FolderContentService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) {}

  multipartHeaders = new HttpHeaders({ enctype: 'multipart/form-data' });

  getContents(folderId: string): Observable<IContentResponse[]> {
    return this.http.get<IContentResponse[]>(
      `${this.apiService.apiUrl}/folder-content/list/${folderId}`
    );
  }

  uploadFiles(uploadForm: FormData): Observable<IFolderResponse> {
    return this.http.post<IFolderResponse>(
      `${this.apiService.apiUrl}/s3/upload`,
      uploadForm,
      { headers: this.multipartHeaders }
    );
  }

  findMatches(uploadForm: FormData): Observable<IContentResponse[]> {
    return this.http.post<IContentResponse[]>(
      `${this.apiService.apiUrl}/s3/ref`,
      uploadForm,
      { headers: this.multipartHeaders }
    );
  }
}
