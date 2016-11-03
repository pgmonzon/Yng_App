import { Injectable }    from '@angular/core';
import { TokenFormulario } from './token';

@Injectable()
export class TokenService {

  token = null;
  tokenFormulario = new TokenFormulario('');

  guardarToken(json: string) {
    this.token = json;
    console.log('hola acabo de guardar el token ', this.token);
  }

  pedirToken() {
    return this.token
  }

}
