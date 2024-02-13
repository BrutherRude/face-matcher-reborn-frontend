import { Component, Input } from '@angular/core';
import { Folder } from './folder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {

  @Input() folder: Folder;

  constructor(private router: Router) {}


  redirectToFolderContent(id: string) : void {

    this.router.navigate(['folder-content', id]);
  }

  

}
