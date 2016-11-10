import { Component } from '@angular/core';
import { LoginService }  from '../login.service';
import { OlvidoFormulario } from '../olvido';

@Component({
  selector: 'olvido',
  templateUrl: 'app/components/olvido.component.html',
})

export class OlvidoComponent {

  constructor(private loginService: LoginService) { }

  desactivado = false;
  activo = false;
  formulario = new OlvidoFormulario('','')

  recuperar(): void {
      this.activo = true
      this.loginService.recuperar(this.diagnostic);
  }

  get diagnostic() { return JSON.stringify(this.formulario); }
}
