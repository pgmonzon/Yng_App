import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { LoginComponent }       from './login.component';
import { RegisterComponent }    from './register.component';
import { HeroService }          from './hero.service';
import { LoginService }         from './login.service';

let localStorageServiceConfig = {
	prefix: 'my-app',
	storageType: 'sessionStorage'
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    HeroService,
    LoginService,
    LocalStorageService,
	{
	provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
	}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
