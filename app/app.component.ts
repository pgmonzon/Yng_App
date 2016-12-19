import { Component } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { AppComponentLoginService } from './token.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1><a routerLink="/">{{title}}</a></h1>

    <div style="float: center;">
      <nav>
        {{usuario}}
        <a routerLink="/login" routerLinkActive="active">Login</a>
<!--          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        <a routerLink="/login" routerLinkActive="active">Login</a>
        <a routerLink="/register" routerLinkActive="active">Register</a>
        <a routerLink="/codigo" routerLinkActive="active">Codigo</a>
        <a routerLink="/olvido" routerLinkActive="active">Olvido</a>
        <a routerLink="/fb" routerLinkActive="active">Social Login</a> -->
        </nav>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  usuario: any;
  subscription: Subscription;

  constructor(private logged: AppComponentLoginService) {
    this.usuario = logged.usuario;
    this.subscription = logged.cambiodeUsuario$.subscribe( value => {
      this.usuario = value;
    });
  }
  title = "Yangee";
}
