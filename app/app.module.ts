import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent }         from './app.component';
import { HomeComponent }   from './components/home.component';
import { HeroesComponent }      from './components/heroes.component';
import { HeroDetailComponent }  from './components/hero-detail.component';
import { LoginComponent }       from './components/login.component';
import { LogoutComponent }       from './components/logout.component';
import { RegisterComponent }    from './components/register.component';
import { VerificacionComponent } from './components/verificacion.component';
import { OlvidoComponent }      from './components/olvido.component';
import { FacebookLoginComponent } from './components/facebooklogin.component';

import { HeroService }          from './hero.service';
import { LoginService }         from './login.service';
import { TokenService, AppComponentLoginService }         from './token.service';

import { EqualValidator }       from './equal-validator.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeroDetailComponent,
    HeroesComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    VerificacionComponent,
    OlvidoComponent,
    FacebookLoginComponent,
    EqualValidator,
  ],
  providers: [
    HeroService,
    LoginService,
    TokenService,
    AppComponentLoginService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
