import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponentLoginService } from './token.service';
import { RbacService }  from './rbac.service';
import { MenuObjeto }  from './menu';

import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  logueado = false;
  menues_objetos: Array<MenuObjeto>;
  menues_hijos: Array<MenuObjeto>;
  menues_padres: Array<MenuObjeto>;

  usuario: any;
  subscription: Subscription;

  constructor(private rbacService: RbacService, private logged: AppComponentLoginService) {
    this.usuario = logged.usuario;
    this.subscription = logged.cambiodeUsuario$.subscribe( value => {
      this.usuario = value;
      this.logueado = !this.logueado; //Potencial bug a futuro, hay que modificarlo para que tenga su propio subscribe
      this.rbacService.pedirMenues().then(menues => {this.menues_objetos = menues; this.prepararMenues()})
    });
  }
  title = "Yangee";

  prepararMenues(){
    this.menues_padres = this.conseguirMenuesPadres()
    /*for (var menu_padre of this.menues_padres){

    }*/
  }

  conseguirMenuesPadres() {
    let array_de_padres = [];
    for (var menu of this.menues_objetos){
      if(menu.esmenu){
        array_de_padres.push(menu)
      }
    }
    return array_de_padres
  }

  conseguirMenuesHijos(menu_padre: MenuObjeto):Array<MenuObjeto>{
  // Recibimos un menú padre y de acá creamos una lista con todos los hijos, devolviendo esta lista.
  // returns array
    let array_de_hijos = [];
    for (var menu of this.menues_objetos){
      if(menu.padre == menu_padre.id && menu.esmenu == false){
        array_de_hijos.push(menu)
      }
    }
    return array_de_hijos
  }
  menu(){
    if(!this.menues_objetos){
      return "empty"
    }
    console.log(this.menues_objetos);

  }
}
