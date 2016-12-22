import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { TokenService, AppComponentLoginService }  from './token.service';

import 'rxjs/add/operator/toPromise';

import { LoginFormulario } from './login';

@Injectable()
export class LoginService {
  private heroesUrl = 'http://localhost:3113/ping';  // URL to web api
  private loginUrl = 'http://localhost:3113/api/usuarios/login';
  private registerUrl = 'http://localhost:3113/api/usuarios/register';
  private recuperarUrl = 'http://localhost:3113/api/usuarios/recuperar';
  private mailconCodigoUrl = 'http://localhost:3113/api/usuarios/recuperar/enviarcodigo';
  private cambiarpwdUrl = 'http://localhost:3113/api/usuarios/cambiarcontrasena';
  private verificarUrl = 'http://localhost:3113/api/usuarios/verificar';
  private headers = new Headers({'Content-Type': 'application/json'});
  private token = null;

  constructor(private http: Http,
              private tokenService: TokenService,
              private userService: AppComponentLoginService) { }

  crearAuthorizationHeader(headers:Headers) {
    var token = this.tokenService.pedirToken()
  }

  ping() {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  loguear(json: string): Promise<any>{
    return this.http.post(this.loginUrl, json)
               .toPromise()
               .then(response => {
                 let body = response.json()
                 let login = JSON.parse(json)

                 if (response.status == 201){ //201 Es que está todo bien
                   this.tokenService.guardarToken(body);
                   this.userService.cambio(login.user);
                   return 201;
                 } else  if (response.status == 202){ //202 es que está todo bien pero falta activar la cuenta
                   this.tokenService.guardarToken(body);
                   this.userService.cambio(login.user)
                   return 202;
                 } else {
                   return response.status;
                 }
               })
               .catch(this.handleError);
  }

  registrar(json: string): Promise<any> {
    return this.http.post(this.registerUrl, json)
               .toPromise()
               .then(response => {
                 let body = response.json();
                 if (response.status == 201){
                   return 201;
                 }
               })
               .catch(this.handleError);
  }

  recuperar(json: string) {
    return this.http.post(this.recuperarUrl, json)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  enviarCodigo(json: string) { //???
    return this.http.post(this.mailconCodigoUrl, json)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  enviarPwd(json: string) { //enviar la NUEVA password despues de recuperar la contraseña
    let headers_auth = new Headers ();
    var token = this.tokenService.pedirToken()
    headers_auth.append('Authorization', 'Bearer ' + token)
    return this.http.post(this.cambiarpwdUrl, json, {headers: headers_auth})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  verificarCodigo(json: string) { //envia el codigo de verificacion de cuenta despues del registro
    let headers_auth = new Headers ();
    var token = this.tokenService.pedirToken()
    headers_auth.append('Authorization', 'Bearer ' + token)
    return this.http.post(this.verificarUrl, json, {headers: headers_auth})
               .toPromise()
               .then(response => {
                  if (response.status == 201){
                    return 201;
                  }
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
