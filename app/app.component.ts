import { Component } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponentLoginService } from './token.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1><a routerLink="/">{{title}}</a></h1>
      <div *ngIf="logueado" ngbDropdown class="d-inline-block">
          <button class="btn btn-outline-primary" id="dropdownMenu1" ngbDropdownToggle>{{usuario}}</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
              <a href="/logout" class="dropdown-item">Logout</a>
          </div>
      </div>
      <div *ngIf="!logueado">
        <nav><a routerLink="/login" routerLinkActive="active">Login</a></nav>
      </div>
    <!--</div> -->

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
