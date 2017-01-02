/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 27/12/16.
 */

module app.loginservice {

    'use strict';
    import LoggingUser = app.home.nolog.LoggingUser;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////

    export class ResponseToken {
        token: string;

        constructor(token: string) {
            this.token = token;
        }
    }

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface ILoginService {
        isLogged: boolean;
        checkIfLogged(): boolean;
        checkTokenSync(token: string): boolean;
        login(user: LoggingUser): boolean;
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class LoginService implements ILoginService {
        isLogged: boolean = undefined;

        constructor(public $localStorage, public $cookies) {
            this.isLogged = this.checkIfLogged();
            console.log(this.isLogged);
        }

        public checkIfLogged(): boolean {
            let isLoggedLocalStorage = this.$localStorage.isLogged;
            let bearerCookie = this.$cookies.get('Bearer');

            if(bearerCookie == null || isLoggedLocalStorage == null) {
                console.log("Not logged ");
                return false;
            }

            if(isLoggedLocalStorage != true) {
                return false;
            }

            // TODO connect with the real api gateway
            // return this.checkTokenSync(bearerCookie);
            return true;
        }

        public checkTokenSync(token: string): boolean {
            if(token == null) {
                return false;
            }

            let http = new XMLHttpRequest();
            let url = 'http://localhost/api/authentication/validate';
            http.open("POST", url, false);
            http.setRequestHeader('Content-Type', 'application/txt');

            // TODO connect with the real api gateway
            http.send('eyJhbGciOiJIUzUxMiJ9.' +
                'eyJzdWIiOiJSaWNoYXJkMDEyIiwiY3JlYXRlZCI6MTQ4MTU4NDA5ODE1NywiZXhwIjoxNDg0MTc2MDk4fQ.' +
                '0-cTOpZXwz7FewssjHpfXbWnr6JDUYX7B1ZbT3OPU6ude3MzA21obWA6VRtfysAwFSwIYXtSDINqDRM1EbTFJw');

            return http.status == 200;
        }

        login(user: LoggingUser): boolean {
            let stringUser: string = JSON.stringify(user);
            let http = new XMLHttpRequest();
            let url = 'http://localhost/api/authentication/auth';
            http.open("POST", url, false);
            http.setRequestHeader('Content-Type', 'application/json');

            console.log("Logging in...", stringUser);
            http.send(stringUser);

            if(http.status != 200) {
                return false;
            }

            let obtainedToken: ResponseToken = JSON.parse(http.response);

            this.$cookies.put('Bearer', obtainedToken.token);

            this.isLogged = true;

            return true;
        }
}

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.loginservice', ['ngStorage', 'ngCookies'])
        .service("LoginService", ['$localStorage', '$cookies', LoginService]);
}
