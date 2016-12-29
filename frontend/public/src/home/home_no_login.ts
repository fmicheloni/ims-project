/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 27/12/16.
 */

module app.home.nolog {

    'use strict';
    import ILoginService = app.loginservice.ILoginService;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////

    export class LoggingUser {
        username: string;
        password: string;

        constructor(username: string, password: string) {
            this.username = username;
            this.password = password;
        }
    }

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IHomeNoLogCtrl {
        login(): void;
        usernameLogin: string;
        passwordLogin: string;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class HomeNoLogCtrl implements IHomeNoLogCtrl {
        private usernameLogin: string = "";
        private passwordLogin: string = "";

        constructor(public LoginService: ILoginService, public $window) {
        }

        public login(): void {
            let user = new LoggingUser(this.usernameLogin, this.passwordLogin);
            console.log(user);

            let result =  this.LoginService.login(user);

            if(result) {
                this.$window.location.href = '/';
            } else {
            //    TODO show error message
            }
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home.nolog', ['app.loginservice', 'angularSpinner'])
        .directive('homeNoLogDirective', () => {
            return {
                templateUrl: '../../views/home/home_no_login.html',
                controller: HomeNoLogCtrl,
                controllerAs: 'homeNoLogCtrl'
            };
        });
}
