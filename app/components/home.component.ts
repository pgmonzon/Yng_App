import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService }  from '../login.service';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ]
})
export class HomeComponent {

  constructor(private loginService: LoginService) { }


  get bienvenida(){return 'Bienvenido'}

  enviar_secured_ping(): void {
    this.loginService.securedPing()
  }
}
