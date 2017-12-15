import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ContentService, NotificationService } from '@alfresco/adf-core';
import { DocumentListComponent, DownloadZipDialogComponent } from '@alfresco/adf-content-services';
import { MinimalNodeEntity, MinimalNodeEntryEntity } from 'alfresco-js-api';

import { VersionManagerDialogComponent } from './version-manager-dialog.component';


@Component({
  selector: 'app-repository-list-page',
  templateUrl: './repository-list-page.component.html',
  styleUrls: ['./repository-list-page.component.scss']
})
export class RepositoryListPageComponent implements OnInit, OnDestroy {
  currentFolderId = '-root-'; // By default display /Company Home

  private onCreateFolderSubscription: Subscription;

  @ViewChild(DocumentListComponent)
  documentList: DocumentListComponent;

  constructor(protected notificationService: NotificationService,
              protected contentService: ContentService,
              protected dialog: MatDialog,
              protected activatedRoute: ActivatedRoute,
              protected router: Router) {  }

  ngOnInit() {
    // Check if we should display some other folder than root
    const currentFolderIdObservable = this.activatedRoute
      .queryParamMap
      .map(params => params.get('current_folder_id'));
    currentFolderIdObservable.subscribe((id: string) => {
      if (id) {
        this.currentFolderId = id;
        this.documentList.loadFolderByNodeId(this.currentFolderId);
      }
    });

    this.onCreateFolderSubscription = this.contentService.folderCreate.subscribe(value => this.onFolderCreated(value));
  }

  ngOnDestroy() {
    this.onCreateFolderSubscription.unsubscribe();
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

  onFolderCreated(node: MinimalNodeEntryEntity) {
    if (node && node.parentId === this.documentList.currentFolderId) {
      this.documentList.reload();
    }
  }

  getDocumentListCurrentFolderId() {
    return this.currentFolderId;
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

  onFolderDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    console.log('RepositoryListPageComponent: Navigating to details page for folder: ' + entry.name);
    this.router.navigate(['/repository', entry.id]);
  }

  onDocumentDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    console.log('RepositoryListPageComponent: Navigating to details page for document: ' + entry.name);
    this.router.navigate(['/repository', entry.id]);
  }

  onFolderDetailsForm(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    console.log('RepositoryListPageComponent: Navigating to details page (form) for folder: ' + entry.name);
    this.router.navigate(['/repository/form', entry.id]);
  }

  onDocumentDetailsForm(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    console.log('RepositoryListPageComponent: Navigating to details page (form) for document: ' + entry.name);
    this.router.navigate(['/repository/form', entry.id]);
  }
}
