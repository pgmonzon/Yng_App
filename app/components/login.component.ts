import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService }  from '../login.service';
import { TokenService, AppComponentLoginService }  from '../token.service';
import { LoginFormulario } from '../login';
import { TokenFormulario } from '../token';
import { FacebookLogin } from '../social-login';

declare const FB:any;
declare const gapi:any;

@Component({
  selector: 'my-login',
  templateUrl: 'app/components/login.component.html',
})

export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private tokenService: TokenService,
              private userService: AppComponentLoginService,
              private router: Router,) {

                  FB.init({
                      appId      : '146855582455399',
                      cookie     : false,  // enable cookies to allow the server to access the session
                      xfbml      : true,  // parse social plugins on this page
                      version    : 'v2.8' // use graph api version 2.5
                  });
              }

  formulario = new LoginFormulario('', '', '');
  formularioToken = new TokenFormulario('');
  respuesta = null

  conectado = null;
  userAuthToken = null;
  userDisplayName = "empty";


  guardarToken(data: string): void {
    this.tokenService.guardarToken(data)
  }

  loguear(): void {
    this.loginService.loguear(this.diagnostic).then(respuesta => {
      if (respuesta == 201) {
        this.router.navigate(['/']);
      } else if (respuesta == 202) {
        this.router.navigate(['/codigo']);
      }
    } )
  }

  mostrarToken(): void{
    console.log(this.tokenService.pedirToken())
  }

  get diagnostic() { return JSON.stringify(this.formulario); }

  onFacebookLoginClick() {
      //Chequeamos si está conectado o no. Si no lo está, lo intentamos loguear.
      FB.getLoginStatus(response => { (this.conectado = this.statusChangeCallback(response)); } );
      if (!this.conectado){
        FB.login();
        this.onFacebookLoginClick();
      } else {
        this.FacebookApi();
      }

    }

    FacebookApi(): any {
      FB.api('/me?fields=id,name,link,gender,birthday,email,picture.width(150).height(150),age_range,friends',
          (result) => {
              if (result && !result.error) {
                  let user = result;
                  console.log(user);
                  this.loguearFacebook(user);
                  this.userService.cambio(result.name); //HARDCODE, ESTO NO TIENE QUE SER ASI PORQUE NO ESTAMOS REALMENTE LOGUEADOS
                  this.userDisplayName = result.name;
              } else {
                  console.log(result.error);
              }
          });
    }

    get username() { return this.userDisplayName; }

    loguearFacebook(user: string) {
      console.log("LOGUEANDO:", user);
      this.loginService.loguearFacebook(user);
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            console.log("Facebook esta conectado");
            return true;
            // connect here with your server for facebook login by passing access token given by facebook
        }else if (resp.status === 'not_authorized') {
            console.log("No estamos autorizados");

        }else {
            console.log("Facebook no esta conectado");
            return false;
        }
    }

    ngOnInit() {
        FB.getLoginStatus(response => { console.log(this.statusChangeCallback(response) + ' Esto es ngOnInit'), (console.log(response)); } );
    }

    ngAfterViewInit() {
      gapi.load('auth2', console.log("cargando gapi") , function() {
        gapi.auth2.init({
          client_id: '885364845288-nk6hrp9rpeli7n8670jpq4nnp75ma79f.apps.googleusercontent.com',
          scope: 'profile',
        });
      });
      gapi.signin2.render('google-login', {
          'scope': 'profile',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onSuccess': (usuario) => ( console.log(usuario) ),
          'onfailure': function(err){console.log("error google: "+err);}
      });
    }

    onGoogleLoginSuccess(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    }

}
