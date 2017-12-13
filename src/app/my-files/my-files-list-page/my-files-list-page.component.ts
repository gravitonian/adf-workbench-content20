import { Component, OnInit } from '@angular/core';
import { RepositoryListPageComponent } from '../../repository/repository-list-page/repository-list-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { NotificationService, ContentService } from '@alfresco/adf-core';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';

@Component({
  selector: 'app-my-files-list-page',
  templateUrl: './my-files-list-page.component.html',
  styleUrls: ['./my-files-list-page.component.scss']
})
export class MyFilesListPageComponent extends RepositoryListPageComponent implements OnInit {
  currentFolderId = '-my-'; // By default display /Company Home/User Homes/<userid>

  constructor(notificationService: NotificationService,
              contentService: ContentService,
              dialog: MatDialog,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(notificationService, contentService, dialog , activatedRoute, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    this.router.navigate(['/my-files', entry.id]);
  }
}
