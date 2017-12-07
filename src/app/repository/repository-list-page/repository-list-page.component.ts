import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ContentService, FolderCreatedEvent, NotificationService } from '@alfresco/adf-core';
import { DocumentListComponent, DownloadZipDialogComponent } from '@alfresco/adf-content-services';
import { MinimalNodeEntity, MinimalNodeEntryEntity } from 'alfresco-js-api';

import { VersionManagerDialogComponent } from './version-manager-dialog.component';

@Component({
  selector: 'app-repository-list-page',
  templateUrl: './repository-list-page.component.html',
  styleUrls: ['./repository-list-page.component.scss']
})
export class RepositoryListPageComponent implements OnInit {
  @ViewChild(DocumentListComponent)
  documentList: DocumentListComponent;

  constructor(private notificationService: NotificationService,
              private contentService: ContentService,
              private dialog: MatDialog) {  }

  ngOnInit() {
    this.contentService.folderCreated.subscribe(value => this.onFolderCreated(value));
  }

  onDragAndDropUploadSuccess($event: Event) {
    console.log('Drag and Drop upload successful!');

    // Refresh the page so you can see the new files
    this.documentList.reload();
  }

  getNodesForPermissionCheck(): MinimalNodeEntity[] {
    if (this.documentList.folderNode) {
      return [{entry: this.documentList.folderNode}];
    } else {
      return [];
    }
  }

  onDownloadAsZip(event: any) {
    const node: MinimalNodeEntity = event.value;

    this.downloadZip([node]);
  }

  downloadZip(selection: Array<MinimalNodeEntity>) {
    if (selection && selection.length > 0) {
      const nodeIds = selection.map(node => node.entry.id);

      const dialogRef = this.dialog.open(DownloadZipDialogComponent, {
        width: '600px',
        data: {
          nodeIds: nodeIds
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Download folder as ZIP result: ', result);
      });
    }
  }

  onContentActionPermissionError(event: any) {
    this.notificationService.openSnackMessage(
      `You don't have the '${event.permission}' permission to do a '${event.action}' operation on the ${event.type}`,
      4000);
  }

  onContentActionSuccess(nodeId) {
    console.log('Successfully executed content action for node: ' + nodeId);
  }

  onContentActionError(error) {
    console.log('There was an error executing content action: ' + error);
  }

  onManageVersions(event) {
    const nodeEntry: MinimalNodeEntryEntity = event.value.entry;

    this.dialog.open(VersionManagerDialogComponent, {
      data: {nodeEntry},
      panelClass: 'adf-version-manager-dialog',
      width: '630px'
    });
  }

  onFolderCreated(event: FolderCreatedEvent) {
    if (event && event.parentId === this.documentList.currentFolderId) {
      this.documentList.reload();
    }
  }

  getDocumentListCurrentFolderId() {
    return this.documentList.currentFolderId || '-root-';
  }

  canCreateContent(parentNode: MinimalNodeEntryEntity): boolean {
    if (parentNode) {
      return this.contentService.hasPermission(parentNode, 'create');
    }
    return false;
  }

  onButtonUploadSuccess($event: Event) {
    console.log('Upload button successful!');

    this.documentList.reload();
  }
}
