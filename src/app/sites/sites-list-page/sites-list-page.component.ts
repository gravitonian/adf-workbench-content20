import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { SiteModel, NotificationService, ContentService, AlfrescoApiService } from '@alfresco/adf-core';
import { RepositoryListPageComponent } from '../../repository/repository-list-page/repository-list-page.component';
import { MinimalNodeEntity, MinimalNodeEntryEntity } from 'alfresco-js-api';

@Component({
  selector: 'app-sites-list-page',
  templateUrl: './sites-list-page.component.html',
  styleUrls: ['./sites-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SitesListPageComponent extends RepositoryListPageComponent implements OnInit {
  sitesDataStore = '-sites-'; // By default display /Company Home/Sites
  currentFolderId = this.sitesDataStore;

  constructor(notificationService: NotificationService,
              contentService: ContentService,
              dialog: MatDialog,
              activatedRoute: ActivatedRoute,
              router: Router,
              private apiService: AlfrescoApiService) {
    super(notificationService, contentService, dialog , activatedRoute, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  siteListing() {
    return this.currentFolderId === this.sitesDataStore;
  }

  getSiteContent(site: SiteModel) {
    if (site && site.guid) {
      this.getDocumentLibrarySiteContainer(site);
    } else {
      this.currentFolderId = this.sitesDataStore;
    }
  }

  onDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    this.router.navigate(['/sites', entry.id]);
  }

  private getDocumentLibrarySiteContainer(site: SiteModel): any {
    const include = ['properties'];
    const documentLibraryContainerId = 'documentLibrary';

    this.apiService.getInstance().core.sitesApi.getSiteContainer(
      site.id, documentLibraryContainerId, include).then((nodeEntity: MinimalNodeEntity) => {
      const node: MinimalNodeEntryEntity = nodeEntity.entry;
      this.currentFolderId = node.id;
    });
  }
}
