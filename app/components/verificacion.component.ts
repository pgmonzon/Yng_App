import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService }  from '../login.service';
import { TokenService }  from '../token.service';
import { VerificacionFormulario } from '../verificacion';


@Component({
  selector: 'my-login',
  templateUrl: 'app/components/verificacion.component.html',
})

export class VerificacionComponent {

  constructor(private loginService: LoginService, tokenService: TokenService, private router: Router,) { }

  formulario = new VerificacionFormulario('');

  enviarCodigo(): void {
	   this.loginService.verificarCodigo(JSON.stringify(this.formulario)).then(response => {
       if (response == 201) {
         this.router.navigate(['/home'])
       }
     })
  }

  respuesta = null
}
