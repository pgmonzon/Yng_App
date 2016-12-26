import { Component } from '@angular/core';
import { LoginService }  from '../login.service';
import { TokenService }  from '../token.service';
import { OlvidoFormulario } from '../olvido';
import { TokenFormulario } from '../token';

@Component({
  selector: 'olvido',
  templateUrl: 'app/components/olvido.component.html',
})

export class OlvidoComponent {

  constructor(private loginService: LoginService,
              private tokenService: TokenService) { }

  formulario_contrasena = true;
  activo = false;
  formulario = new OlvidoFormulario('','')


  enviarMail(): void {
    this.activo = true
    this.loginService.recuperar(this.diagnostic);
  }

  enviarCodigo(): void {
    this.loginService.enviarCodigo(this.diagnostic).then(data => this.guardarToken(data));
    this.formulario_contrasena = false;
  }

  enviarPwd(): void {
    this.loginService.enviarPwd(JSON.stringify(this.formulario));
  }

  guardarToken(data: string): void {
    this.tokenService.guardarToken(data)
  }

  get diagnostic() { return JSON.stringify(this.formulario); }
}
