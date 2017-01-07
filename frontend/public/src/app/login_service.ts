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
        getIsLogged(): boolean;
        loggedUser: string;
        checkIfLogged(): boolean;
        checkTokenSync(token: string): boolean;
        login(user: LoggingUser): number;
        logout(): void;
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class LoginService implements ILoginService {
        isLogged: boolean = false;
        loggedUser: string = undefined;

        constructor(public $localStorage, public $cookies, public $window) {
            console.log('Creating LoginService...');

            this.isLogged = this.checkIfLogged();
        }

        getIsLogged(): boolean {
            return this.isLogged;
        }

        public checkIfLogged(): boolean {
            let isLoggedLocalStorage = this.$localStorage.isLogged;
            let username = this.$localStorage.username;
            let bearerCookie = this.$cookies.get('Bearer');

            if (bearerCookie == null || isLoggedLocalStorage == null || username == null) {
                console.log("Not logged ");
                return false;
            }

            if (isLoggedLocalStorage != true) {
                return false;
            }

            return this.checkTokenSync(bearerCookie);
        }

        public checkTokenSync(token: string): boolean {

            if (token == null) {
                return false;
            }

            let http = new XMLHttpRequest();
            let url = '/api/authentication/validate';
            http.open("POST", url, false);
            http.setRequestHeader('Content-Type', 'application/txt');

            http.send(this.$cookies.get('Bearer'));

            return http.status == 200;
        }

        login(user: LoggingUser): number {
            let stringUser: string = JSON.stringify(user);
            let http = new XMLHttpRequest();
            let url = '/api/authentication/auth';
            http.open("POST", url, false);
            http.setRequestHeader('Content-Type', 'application/json');

            console.log("Logging in...", stringUser);

            http.send(stringUser);

            if (http.status != 200) {
                return http.status;
            }

            let obtainedToken: ResponseToken = JSON.parse(http.response);

            this.$cookies.put('Bearer', obtainedToken.token);

            this.isLogged = true;
            this.$localStorage.isLogged = true;

            this.loggedUser = user.username;
            this.$localStorage.username = user.username;

            console.log(user.username);

            return http.status;
        }

        logout(): void {
            this.$cookies.remove('Bearer');
            this.$localStorage.isLogged = undefined;
            this.$localStorage.username = undefined;
            this.$window.location.href = '/';
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.loginservice', ['ngStorage', 'ngCookies'])
        .service("LoginService", ['$localStorage', '$cookies', '$window', LoginService]);
}
