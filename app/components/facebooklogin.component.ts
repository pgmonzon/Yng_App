import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const FB:any;
declare const gapi:any;

@Component({
    selector: 'facebook-login',
    templateUrl: 'app/components/facebooklogin.html',
})

export class FacebookLoginComponent implements OnInit {

    constructor() {
        FB.init({
            appId      : '146855582455399',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
    }

    onSignIn(googleUser) {
      console.log("gato");
    }

    onFacebookLoginClick() {
      FB.login();
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
        }else if (resp.status === 'not_authorized') {

        }else {

        }
    };
    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }

    ngAfterViewInit() {
      gapi.signin2.render('google-login', {
          'scope': 'profile',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': param => this.onSignIn(param)
      });
    }
}
