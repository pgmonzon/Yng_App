import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './components/dashboard.component';
import { HeroesComponent }      from './components/heroes.component';
import { HeroDetailComponent }  from './components/hero-detail.component';
import { LoginComponent }       from './login.component';
import { RegisterComponent }    from './register.component';
import { VerificacionComponent } from './verificacion.component';
import { HeroService }          from './hero.service';
import { LoginService }         from './login.service';
import { TokenService }         from './token.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    LoginComponent,
    RegisterComponent,
    VerificacionComponent,
  ],
  providers: [
    HeroService,
    LoginService,
    TokenService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
