import { Component, Input } from '@angular/core';
import { Folder } from './folder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
})
export class FolderComponent {
  @Input() folder: Folder;

  constructor(private router: Router) {}

  redirectToFolderContent(folder: Folder): void {
    this.router.navigate([
      'folder-content',
      {
        id: folder.id,
        folderName: folder.name,
        folderPath: folder.folderPath,
        folderPklPath: folder.folderPklPath,
      },
    ]);
  }
}
