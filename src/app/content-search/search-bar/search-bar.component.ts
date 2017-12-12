import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@alfresco/adf-core';
import { MinimalNodeEntity } from 'alfresco-js-api';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchTerm = '';

  constructor(public router: Router,
              public authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSearchSubmit(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.router.navigate(['/search', {
      'q': searchTerm
    }]);
  }

  onItemClicked(node: MinimalNodeEntity) {
    console.log('Item clicked: ', node);

    this.router.navigate(['/repository', node.entry.id]);
  }

  onSearchTermChange(event) {
    this.searchTerm = event.value;
  }
}
