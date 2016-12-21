import { Component } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { AppComponentLoginService } from './token.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1><a routerLink="/">{{title}}</a></h1>

    <div style="float: center;">
      <div *ngIf="logueado" class="dropdown" dropdown>
        <button class="btn btn-primary" dropdown-open>Perfil</button>
        <ul class="dropdown-menu">
          <li>Logueado como: <b>{{usuario}}</b></li>
          <li><a href="#">Mi perfil</a></li>
          <li><a href="#">Mis compras</a></li>
          <li><a href="#">Ayuda</a></li>
          <li><hr></li>
          <li><a href="#">Configuración</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
      <div *ngIf="!logueado">
        <nav><a routerLink="/login" routerLinkActive="active">Login</a></nav>
      </div>
    </div>

      <!--<nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        <a routerLink="/login" routerLinkActive="active">Login</a>
        <a routerLink="/register" routerLinkActive="active">Register</a>
        <a routerLink="/codigo" routerLinkActive="active">Codigo</a>
        <a routerLink="/olvido" routerLinkActive="active">Olvido</a>
        <a routerLink="/fb" routerLinkActive="active">Social Login</a>
        </nav>-->
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  logueado = false;

  usuario: any;
  subscription: Subscription;

  constructor(private logged: AppComponentLoginService) {
    this.usuario = logged.usuario;
    this.subscription = logged.cambiodeUsuario$.subscribe( value => {
      this.usuario = value;
      this.logueado = !this.logueado; //Potencial bug a futuro, hay que modificarlo para que tenga su propio subscribe
    });
  }
  title = "Yangee";
}
