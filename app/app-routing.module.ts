import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './components/home.component';
import { HeroesComponent }      from './components/heroes.component';
import { HeroDetailComponent }  from './components/hero-detail.component';
import { LoginComponent }       from './components/login.component';
import { RegisterComponent }    from './components/register.component';
import { VerificacionComponent } from './components/verificacion.component';
import { OlvidoComponent }      from './components/olvido.component';
import { FacebookLoginComponent } from './components/facebooklogin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'register',     component: RegisterComponent },
  { path: 'codigo',	component: VerificacionComponent },
  { path: 'olvido', component: OlvidoComponent},
  { path: 'fb', component: FacebookLoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
