import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/components/content/content';
import { FolderContentService } from './services/folder-content.service';
import { IContentResponse } from 'src/app/components/content/interfaces/response/content-response.interface';

@Component({
  selector: 'app-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.css']
})
export class FolderContentComponent implements OnInit {

  folderId: string;

  constructor(private route: ActivatedRoute, private router : Router, private folderContentService : FolderContentService) {}

  ngOnInit(): void {
    this.initializeFolderId();
    this.getContents();
  }

  contents : Content[] = [];

  async getContents(): Promise<void> {

    this.contents = [];

    this.folderContentService.getContents(this.folderId).subscribe(
      (response: IContentResponse[]) => {
        response.forEach((folderResponse: IContentResponse) => {
          this.contents.push(
            new Content(
              folderResponse.folderContentId,
              folderResponse.filePath,
              folderResponse.URL,
              folderResponse.folderId,
              folderResponse.fileName,
              folderResponse.fileExtension,
              folderResponse.createdAt
            )
          );
        });

      this.contents.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      },
      (error) => {
        window.alert(error.error.detail);
      }
    );
  }
  

  initializeFolderId(): void {
    if(typeof this.route.snapshot.paramMap.get('id') !== "string") {
      this.router.navigate([""]);
    }
    this.folderId = this.route.snapshot.paramMap.get('id')!;
  }
}
