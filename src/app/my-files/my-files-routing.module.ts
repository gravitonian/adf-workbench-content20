import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoryDetailsPageComponent } from '../repository/repository-details-page/repository-details-page.component';
import { MyFilesListPageComponent } from './my-files-list-page/my-files-list-page.component';
import { MyFilesPageComponent } from './my-files-page/my-files-page.component';

import { AuthGuardEcm } from '@alfresco/adf-core';

const routes: Routes = [ {
  path: 'my-files',
  component: MyFilesPageComponent,
  canActivate: [AuthGuardEcm],
  data: {
    title: 'My Files',
    icon: 'folder_shared',

    hidden: false,
    needEcmAuth: true,
    isLogin: false
  },
  children: [
    { path: '', component: MyFilesListPageComponent, canActivate: [AuthGuardEcm] },
    { path: ':node-id', component: RepositoryDetailsPageComponent, canActivate: [AuthGuardEcm]  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFilesRoutingModule { }
