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

  guardarToken(data: string): void {
    this.tokenService.guardarToken(data)
  }

  loguear(): void {
    this.respuesta = this.loginService.loguear(this.diagnostic).then(data => this.guardarToken(data))
    this.formulario = this.respuesta
  }

  mostrarToken(): void{
    console.log(this.tokenService.pedirToken())
  }

  get diagnostic() { return JSON.stringify(this.formulario); }
}
