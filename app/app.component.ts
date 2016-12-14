import { Component } from '@angular/core';
import { MainUsuarioService } from './token.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>{{usuario}}</h2>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a routerLink="/register" routerLinkActive="active">Register</a>
      <a routerLink="/codigo" routerLinkActive="active">Codigo</a>
      <a routerLink="/olvido" routerLinkActive="active">Olvido</a>
      <a routerLink="/fb" routerLinkActive="active">Social Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  usuario: any;
  constructor(private logged: MainUsuarioService) {
    this.usuario = logged.usuario;
    /*this._subscription = logged.nameChange.subscribe((value) => {
      this.usuario = value;
    });*/
  }
  title = "Yangee";
}
