import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MinimalNodeEntryEntity, NodePaging } from 'alfresco-js-api';
import { NotificationService } from '@alfresco/adf-core';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {
  queryParamName = 'q';
  searchTerm = '';
  resultNodePageList: NodePaging;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    if (this.activatedRoute) {
      this.activatedRoute.params.forEach((params: Params) => {
        this.searchTerm = params.hasOwnProperty(this.queryParamName) ? params[this.queryParamName] : null;
      });
    }
  }

  showSearchResult(event: NodePaging) {
    this.resultNodePageList = event;
  }

  onDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    this.router.navigate(['/repository', entry.id]);
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
}
