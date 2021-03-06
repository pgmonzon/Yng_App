import { Component } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponentLoginService } from './token.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  logueado = false;

  usuario: any;
  subscription: Subscription;

  constructor(private logged: AppComponentLoginService) {
    this.usuario = logged.usuario;
    this.subscription = logged.cambiodeUsuario$.subscribe( value => {
      this.usuario = value;
      this.logueado = !this.logueado; //Potencial bug a futuro, hay que modificarlo para que tenga su propio subscribe
    });
  }
  title = "Yangee";
}
