import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { TokenService }  from './token.service';

import { MenuObjeto }  from './menu';

import 'rxjs/add/operator/toPromise';

import { LoginFormulario } from './login';

@Injectable()
export class RbacService {
  private usuarios = 'http://localhost:3113/api/usuarios';

  constructor(private http: Http,
              private tokenService: TokenService) { }

  //api/usuarios/permisos y conseguir la lista
  pedirPermisos() { //enviar la NUEVA password despues de recuperar la contraseña
    let headers_auth = new Headers ();
    var token = this.tokenService.pedirToken()
    if (!token)
      return
    headers_auth.append('Authorization', 'Bearer ' + token)
    return this.http.get(this.usuarios + '/permisos', {headers: headers_auth})
               .toPromise()
               .then(response => response.json())
               //.catch(this.handleError);
  }


  pedirMenues(): Promise<MenuObjeto[]> {
    return this.http.get('http://localhost:3113/api/menues')
               .toPromise()
               .then(response => <MenuObjeto[]>response.json())
               //.catch(this.handleError);
  }
}
