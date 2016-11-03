import { Component } from '@angular/core';
import { LoginService }  from './login.service';
import { TokenService }  from './token.service';
import { LoginFormulario } from './login';

@Component({
  selector: 'my-login',
  templateUrl: 'app/login.component.html',
})

export class LoginComponent {

  constructor(private loginService: LoginService,
              private tokenService: TokenService) { }

  formulario = new LoginFormulario('usuario', 'contraseña');
  respuesta = null

  pinguear(): void {
    this.tokenService.guardarToken(this.formulario.user)
  }

  loguear(): void {
    this.respuesta = this.loginService.loguear(this.diagnostic)
    this.formulario = this.respuesta
  }

  mostrarToken(): void{
    this.formulario = this.tokenService.pedirToken()
  }

  get diagnostic() { return JSON.stringify(this.formulario); }
}
