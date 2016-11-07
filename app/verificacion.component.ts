import { Component } from '@angular/core';
import { LoginService }  from './login.service';
import { TokenService }  from './token.service';
import { VerificacionFormulario } from './verificacion';


@Component({
  selector: 'my-login',
  templateUrl: 'app/verificacion.component.html',
})

export class VerificacionComponent {

  constructor(private loginService: LoginService, tokenService: TokenService) { }

  formulario = new VerificacionFormulario('');

  enviarCodigo(): void {
	   this.loginService.verificar(JSON.stringify(this.formulario))
  }

  respuesta = null
}
