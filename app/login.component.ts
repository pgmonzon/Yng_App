import { Component } from '@angular/core';
import { LoginService }  from './login.service';
import { LoginFormulario } from './login';

@Component({
  selector: 'my-login',
  templateUrl: 'app/login.component.html',
})

export class LoginComponent {

  constructor(private loginService: LoginService) { }

  formulario = new LoginFormulario('usuario', 'contraseña');
  respuesta = null

  pinguear(): void {
    this.loginService.ping()
  }

  loguear(): void {
    this.respuesta = this.loginService.loguear(this.diagnostic)
    this.formulario = this.respuesta
  }

  get diagnostic() { return JSON.stringify(this.formulario); }
}
