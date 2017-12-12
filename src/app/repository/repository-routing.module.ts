import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoryPageComponent } from './repository-page/repository-page.component';
import { RepositoryDetailsPageComponent } from './repository-details-page/repository-details-page.component';
import { RepositoryListPageComponent } from './repository-list-page/repository-list-page.component';
import { RepositoryDetailsFormPageComponent } from './repository-details-form-page/repository-details-form-page.component';

import { AuthGuardEcm } from '@alfresco/adf-core';

const routes: Routes = [
  {
    path: 'repository',
    component: RepositoryPageComponent,
    canActivate: [AuthGuardEcm],
    data: {
      title: 'Repository',
      icon: 'folder',

      hidden: false,
      needEcmAuth: true,
      isLogin: false
    },
    children: [
      { path: '', component: RepositoryListPageComponent, canActivate: [AuthGuardEcm] },
      { path: ':node-id', component: RepositoryDetailsPageComponent, canActivate: [AuthGuardEcm] },
      { path: 'form/:node-id', component: RepositoryDetailsFormPageComponent, canActivate: [AuthGuardEcm] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule {}
