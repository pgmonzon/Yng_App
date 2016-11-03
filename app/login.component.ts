import { Component } from '@angular/core';
import { LoginService }  from './login.service';
import { TokenService }  from './token.service';
import { LoginFormulario } from './login';
import { TokenFormulario } from './token';

@Component({
  selector: 'my-login',
  templateUrl: 'app/login.component.html',
})

export class LoginComponent {

  constructor(private loginService: LoginService,
              private tokenService: TokenService) { }

  formulario = new LoginFormulario('', '');
  formularioToken = new TokenFormulario('');
  respuesta = null

  guardarToken(): void {
    this.formularioToken.token = JSON.stringify(this.respuesta)
    this.tokenService.guardarToken(this.formularioToken.token)
    console.log('guardo formulario en ', this.formularioToken)
  }

  loguear(): void {
    this.respuesta = this.loginService.loguear(this.diagnostic)
    this.formulario = this.respuesta
  }

  mostrarToken(): void{
    console.log(this.tokenService.pedirToken())
  }

  get diagnostic() { return JSON.stringify(this.formulario); }
}
