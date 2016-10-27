import { Component } from '@angular/core';
import { LoginService }  from './login.service';
import { RegistrarFormulario } from './register';

@Component({
  selector: 'my-register',
  templateUrl: 'app/register.component.html',
})

export class RegisterComponent {

  constructor(private loginService: LoginService) { }

  formulario = new RegistrarFormulario('usuario', 'contraseña', 'example@gmail.com');
  respuesta = null

  pinguear(): void {
    this.loginService.ping()
  }

  registrar(): void {
    this.respuesta = this.loginService.registrar(this.diagnostic)
    this.formulario = this.respuesta
  }

  get diagnostic() { return JSON.stringify(this.formulario); }
}
