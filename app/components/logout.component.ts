import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { TokenService, AppComponentLoginService }  from '../token.service';

import { LoginFormulario } from '../login';
import { TokenFormulario } from '../token';

@Component({
  moduleId: module.id,
  selector: 'logout',
  template: `
    <h1>Deslogueando...</h1>
  `,
  //styleUrls: ['logout.component.css'],
})

export class LogoutComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private userService: AppComponentLoginService,
              private router: Router,) { }

  ngOnInit(): void {
    //Logout es un componente. Borra el token de la memoria, cambia el usuario logueado a '' y por último redirecciona a home
    this.tokenService.borrarToken();
    this.userService.cambio('');
    this.router.navigate(['/']);
  }

}
