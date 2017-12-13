import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesPageComponent } from './sites-page/sites-page.component';
import { SitesListPageComponent } from './sites-list-page/sites-list-page.component';
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    SitesRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core, Content, and Process */
    AppCommonModule
  ],
  declarations: [SitesPageComponent, SitesListPageComponent]
})
export class SitesModule { }
