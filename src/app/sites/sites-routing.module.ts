import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitesPageComponent } from './sites-page/sites-page.component';
import { SitesListPageComponent } from './sites-list-page/sites-list-page.component';
import { RepositoryDetailsPageComponent } from '../repository/repository-details-page/repository-details-page.component';

import { AuthGuardEcm } from '@alfresco/adf-core';

const routes: Routes = [{
  path: 'sites',
  component: SitesPageComponent,
  canActivate: [AuthGuardEcm],
  data: {
    title: 'Sites',
    icon: 'group_work',

    hidden: false,
    needEcmAuth: true,
    isLogin: false
  },
  children: [
    { path: '', component: SitesListPageComponent, canActivate: [AuthGuardEcm] },
    { path: ':node-id', component: RepositoryDetailsPageComponent, canActivate: [AuthGuardEcm] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
