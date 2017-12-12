import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFilesRoutingModule } from './my-files-routing.module';
import { MyFilesPageComponent } from './my-files-page/my-files-page.component';
import { MyFilesListPageComponent } from './my-files-list-page/my-files-list-page.component';
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    MyFilesRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core, Content, and Process */
    AppCommonModule
  ],
  declarations: [MyFilesPageComponent, MyFilesListPageComponent]
})
export class MyFilesModule { }
