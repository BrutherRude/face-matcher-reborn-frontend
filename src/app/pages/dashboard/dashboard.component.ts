import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { IFolderRequest } from '../../components/folder/interfaces/request/folder-request.interface';
import { IFolderResponse } from '../../components/folder/interfaces/response/folder-response.interface';
import { ModalService } from 'src/app/components/modal/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Folder } from 'src/app/components/folder/folder';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    public authService: AuthService,
    protected modalService: ModalService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      folderName: ['', [Validators.required]],
    });
  }

  MODAL_CREATE_FOLDER_ID: string = 'modal-create-folder';

  form: FormGroup;

  folders: Folder[] = [];

  ngOnInit(): void {
    this.getFolders();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      window.alert('invalid form');
      return;
    }
    this.createFolder(this.form.value as IFolderRequest);
  }

  openCreateFolderModal(): void {
    this.modalService.open(this.MODAL_CREATE_FOLDER_ID);
  }

  closeCreateFolderModal(): void {
    this.modalService.close();
  }

  createFolder(folder: IFolderRequest): void {
    this.dashboardService.createFolder(folder).subscribe(
      async (response: IFolderResponse) => {
        this.closeCreateFolderModal();
        this.form.reset();
        await this.getFolders();
      },
      (error) => {
        window.alert(error.error.detail);
      }
    );
  }

  async getFolders(): Promise<void> {
    this.folders = [];

    this.dashboardService.getFolders().subscribe(
      (response: IFolderResponse[]) => {
        response.forEach((folderResponse: IFolderResponse) => {
          this.folders.push(
            new Folder(
              folderResponse.name,
              folderResponse.id,
              folderResponse.userId,
              folderResponse.folderPath,
              folderResponse.folderPklPath,
              folderResponse.createdAt
            )
          );
        });

        this.folders.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
      },
      (error) => {
        window.alert(error.error.detail);
      }
    );
  }
}
