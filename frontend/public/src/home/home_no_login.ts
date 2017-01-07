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

        constructor(public LoginService: ILoginService, public $window, public growl) {
        }

        public login(): void {
            let user = new LoggingUser(this.usernameLogin, this.passwordLogin);
            console.log(user);

            let result: number = this.LoginService.login(user);

            console.log('Result of login is: ', result);

            if(result != 200) {
                if (result == 400) {
                    this.growl.error("Invalid username or password!");
                }

                if (result == 401) {
                    this.growl.error("Your account has not been activated!");
                }

                this.usernameLogin = "";
            }
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home.nolog', ['app.loginservice', 'angularSpinner', 'angular-growl'])
        .directive('homeNoLogDirective', () => {
            return {
                templateUrl: '../../views/home/home_no_login.html',
                controller: HomeNoLogCtrl,
                controllerAs: 'homeNoLogCtrl'
            };
        });
}
