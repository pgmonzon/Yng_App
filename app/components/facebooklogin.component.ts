import { Component, OnInit } from '@angular/core';
import { LoginService }  from '../login.service';
import { FacebookLogin } from '../social-login';
import { Router } from '@angular/router';

declare const FB:any;
declare const gapi:any;

@Component({
    selector: 'facebook-login',
    templateUrl: 'app/components/facebooklogin.html',
})

export class FacebookLoginComponent implements OnInit {

    conectado = null;
    userAuthToken = null;
    userDisplayName = "empty";

    constructor(private loginService: LoginService) {

        FB.init({
            appId      : '146855582455399',
            cookie     : false,  // enable cookies to allow the server to access the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {
      //Chequeamos si está conectado o no. Si no lo está, lo intentamos loguear.
      FB.getLoginStatus(response => { (this.conectado = this.statusChangeCallback(response)); } );
      if (!this.conectado){
        FB.login();
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
                  this.loguear(user);
                  this.userDisplayName = result.name;
              } else {
                  console.log(result.error);
              }
          });
    }

    get username() { return this.userDisplayName; }

    loguear(user: string) {
      console.log("LOGUEANDO:", user);
      this.loginService.loguear(user);
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
