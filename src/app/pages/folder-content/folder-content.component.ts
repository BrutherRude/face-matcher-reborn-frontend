import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/components/content/content';
import { FolderContentService } from './services/folder-content.service';
import { IContentResponse } from 'src/app/components/content/interfaces/response/content-response.interface';
import { ModalService } from 'src/app/components/modal/services/modal.service';
import { IFolderResponse } from 'src/app/components/folder/interfaces/response/folder-response.interface';

@Component({
  selector: 'app-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.css'],
})
export class FolderContentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private folderContentService: FolderContentService,
    protected modalService: ModalService
  ) {}

  folderName: string;
  folderId: string;
  folderPath: string;
  folderPklPath: string;

  MODAL_UPLOAD_FILES_ID: string = 'modal-upload-files';
  MODAL_FIND_MATCHES_ID: string = 'modal-find-matches';
  MODAL_MATCHES_RESULTS_ID: string = 'modal-matches-results';

  UPLOAD_FILES_INPUT_ID: string = 'upload-files-input';
  FIND_MATCHES_INPUT_ID: string = 'find-matches-input';

  contents: Content[] = [];
  matches: Content[] = [];
  files: File[] = [];
  uploadForm: FormData = new FormData();

  ngOnInit(): void {
    this.initializeFolderParams();
    this.getContents();
  }

  initializeFolderParams(): void {
    this.route.params.subscribe((params) => {
      this.folderId = params['id'];
      this.folderName = params['folderName'];
      this.folderPath = params['folderPath'];
      this.folderPklPath = params['folderPklPath'];
    });
  }

  openModal(modalId : string): void {
    this.clear();
    this.modalService.open(modalId);
  }

  closeModal(): void {
    this.clear();
    this.modalService.close();
  }


  clear(): void {
    this.files = [];
    this.uploadForm = new FormData();
  }

  

  async getContents(): Promise<void> {
    this.contents = [];
    await this.folderContentService.getContents(this.folderId).subscribe(
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

        this.contents.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
      },
      (error) => {
        window.alert(error.error.detail);
      }
    );
  }

  onFileSelected(event: any) {
    this.files = event.target.files;
  }

  uploadFiles() {
    this.uploadForm.append('folderName', this.folderName);
    this.uploadForm.append('id', this.folderId);

    for (let i = 0; i < this.files.length; i++) {
      this.uploadForm.append('file', this.files[i]);
    }

    this.folderContentService.uploadFiles(this.uploadForm).subscribe(
      (response: IFolderResponse) => {
        window.alert('Files uploaded');
        this.closeModal();
        this.getContents();
      },
      (error) => {
        window.alert(error.error.detail);
        this.closeModal();
      }
    );
  }


  findMatches() {

    this.matches = [];
    this.uploadForm.append('folderPath', this.folderPklPath);
    this.uploadForm.append('file', this.files[0]);


    this.folderContentService.findMatches(this.uploadForm).subscribe(
      (response: IContentResponse[]) => {

        response.forEach((folderResponse: IContentResponse) => {
          this.matches.push(
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
        this.closeModal();
        this.openModal(this.MODAL_MATCHES_RESULTS_ID);


      },
      (error) => {
        window.alert(error.error.detail);
        this.closeModal();
      }
    );
  }
}
