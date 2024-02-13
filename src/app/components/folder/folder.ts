import { IFolderResponse } from "./interfaces/response/folder-response.interface";

export class Folder {
    name: string;
    id: string;
    userId: string;
    folderPath: string;
    folderPklPath: string;
    createdAt: Date;

    constructor(
        name: string,
        id: string,
        userId: string,
        folderPath: string,
        folderPklPath: string,
        createdAt: number
    ) {
        this.name = name;
        this.id = id;
        this.userId = userId;
        this.folderPath = folderPath;
        this.folderPklPath = folderPklPath;
        this.createdAt = this.milisecondsToDate(createdAt);
    }

    milisecondsToDate(miliseconds: number): Date {
        return new Date(miliseconds);
    }
}