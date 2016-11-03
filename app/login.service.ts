import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LoginFormulario } from './login';

@Injectable()
export class LoginService {
  private heroesUrl = 'http://localhost:3113/ping';  // URL to web api
  private loginUrl = 'http://localhost:3113/api/usuarios/login'
  private registerUrl = 'http://localhost:3113/api/usuarios/register'
  private headers = new Headers({'Content-Type': 'application/json'});
  private token = null

  constructor(private http: Http) { }

  ping() {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  loguear(json: string) {
    return this.http.post(this.loginUrl, json)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  registrar(json: string) {
    return this.http.post(this.registerUrl, json)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
