/*
*   Servicio de tokens y constructor del nombre en la navbar o app component (el que dice si estás logueado o no)
*/

import { Injectable }    from '@angular/core';
import { TokenFormulario } from './token';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TokenService {

  token = null;
  tokenFormulario = new TokenFormulario('');

  guardarToken(json: string) {
    this.token = json;
    console.log('hola acabo de guardar el token ', this.token);
  }

  pedirToken() {
    return this.token.token
  }

}

@Injectable()
export class AppComponentLoginService {
  usuario: any;

  constructor(){this.usuario = 'Nadie logueado';}

  private cambiodeUsuarioSource = new Subject<string>();
  cambiodeUsuario$ = this.cambiodeUsuarioSource.asObservable();

  cambio(valor: string){
    this.usuario = valor
    this.cambiodeUsuarioSource.next(this.usuario)
  }

}
