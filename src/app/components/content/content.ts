export class Content {
  folderContentId: string;
  filePath: string;
  URL: string;
  folderId: string;
  fileName: string;
  fileExtension: string;
  createdAt: Date;

  constructor(
    folderContentId: string,
    filePath: string,
    URL: string,
    folderId: string,
    fileName: string,
    fileExtension: string,
    createdAt: number
  ) {
    this.folderContentId = folderContentId;
    this.filePath = filePath;
    this.URL = URL;
    this.folderId = folderId;
    this.fileName = fileName;
    this.fileExtension = fileExtension;
    this.createdAt = this.milisecondsToDate(createdAt);
  }

  milisecondsToDate(miliseconds: number): Date {
    return new Date(miliseconds);
  }
}
