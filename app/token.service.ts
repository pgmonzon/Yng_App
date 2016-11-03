import { Injectable }    from '@angular/core';

@Injectable()
export class TokenService {

  token = null;

  guardarToken(json: string) {
    this.token = json;
    console.log('hola', this.token);
  }

  pedirToken() {
    return this.token
  }

}
