import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryPageComponent } from './repository-page/repository-page.component';
import { RepositoryListPageComponent } from './repository-list-page/repository-list-page.component';
import { RepositoryDetailsPageComponent } from './repository-details-page/repository-details-page.component';
import { VersionManagerDialogComponent } from './repository-list-page/version-manager-dialog.component';

import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    RepositoryRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core, Content, and Process */
    AppCommonModule
  ],
  declarations: [RepositoryPageComponent, RepositoryListPageComponent, RepositoryDetailsPageComponent, VersionManagerDialogComponent],
  entryComponents: [ VersionManagerDialogComponent ],
})
export class RepositoryModule { }
