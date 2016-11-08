import { Component } from '@angular/core';
import { LoginService }  from '../login.service';
import { TokenService }  from '../token.service';
import { RegistrarFormulario } from '../register';

@Component({
  selector: 'my-register',
  templateUrl: 'app/components/register.component.html',
    styleUrls: [ 'app/components/register.component.css' ]
})

export class RegisterComponent {

  constructor(private loginService: LoginService,
              private tokenService: TokenService) { }

  formulario = new RegistrarFormulario('', '', '');
  respuesta = null

  pinguear(): void {
    this.loginService.ping()
  }

  registrar(): void {
    this.respuesta = this.loginService.registrar(this.diagnostic)
  }

  mostrar(): void {
    console.log(this.tokenService.pedirToken())
  }

  get drespuesta() { return JSON.stringify(this.respuesta); }
  get diagnostic() { return JSON.stringify(this.formulario); }
}
