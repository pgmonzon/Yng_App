import { Component } from '@angular/core';
import { LoginService }  from '../login.service';
import { TokenService }  from '../token.service';
import { LoginFormulario } from '../login';
import { TokenFormulario } from '../token';
import { Router } from '@angular/router';

@Component({
  selector: 'my-login',
  templateUrl: 'app/components/login.component.html',
})

export class LoginComponent {

  constructor(private loginService: LoginService,
              private tokenService: TokenService,
              private router: Router,) { }

  formulario = new LoginFormulario('', '', '');
  formularioToken = new TokenFormulario('');
  respuesta = null

  guardarToken(data: string): void {
    this.tokenService.guardarToken(data)
  }

  loguear(): void {
    this.loginService.loguear(this.diagnostic).then(respuesta => {
      if (respuesta == 201) {
        this.router.navigate(['/dashboard']);
      } else if (respuesta == 202) {
        this.router.navigate(['/codigo']);
      }
    } )
  }

  mostrarToken(): void{
    console.log(this.tokenService.pedirToken())
  }

  get diagnostic() { return JSON.stringify(this.formulario); }
}
