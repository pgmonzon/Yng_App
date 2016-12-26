import { Component } from '@angular/core';
import { LoginService }  from '../login.service';
import { TokenService }  from '../token.service';
import { RegistrarFormulario } from '../register';
import { Router } from '@angular/router';

@Component({
  selector: 'my-register',
  templateUrl: 'app/components/register.component.html',
    styleUrls: [ 'app/components/register.component.css' ]
})

export class RegisterComponent {

  constructor(private loginService: LoginService,
              private tokenService: TokenService,
              private router: Router) { }

  formulario = new RegistrarFormulario('', '', '');
  respuesta = null

  pinguear(): void {
    this.loginService.ping()
  }

  registrar(): void {
    this.loginService.registrar(this.diagnostic).then(respuesta => {
      if (respuesta == 201) {
        this.loginService.loguear(this.diagnostic)
        this.router.navigate(['/codigo']);
      }
    } )
  }

  get drespuesta() { return JSON.stringify(this.respuesta); }
  get diagnostic() { return JSON.stringify(this.formulario); }
}
