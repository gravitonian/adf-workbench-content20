import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentSearchRoutingModule } from './content-search-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';

import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    ContentSearchRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core, Content, and Process */
    AppCommonModule
  ],
  declarations: [SearchBarComponent, SearchResultPageComponent],
  exports: [SearchBarComponent]
})
export class ContentSearchModule { }
