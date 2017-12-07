import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppCommonModule } from './app-common/app-common.module';
import { AppLoginRoutingModule } from './app-login/app-login-routing.module';
import { AppLoginModule } from './app-login/app-login.module';
import { AppMenuService } from './app-menu/app-menu.service';
import { RepositoryRoutingModule } from './repository/repository-routing.module';
import { RepositoryModule } from './repository/repository.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AppCommonModule,
    AppLoginModule,
    AppLoginRoutingModule,
    RepositoryModule,
    RepositoryRoutingModule
  ],
  providers: [AppMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
