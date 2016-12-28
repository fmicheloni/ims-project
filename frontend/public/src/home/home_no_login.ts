/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 27/12/16.
 */

module app.home.nolog {

    'use strict';
    import ILoggedService = app.loginservice.ILoginService;
    import ILoginService = app.loginservice.ILoginService;

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IHomeNoLogCtrl {
        login(): boolean;
        usernameLogin: string;
        passwordLogin: string;
    }

    ///////////////////////////////////////////////////////
    //                     CONTROLLER                    //
    ///////////////////////////////////////////////////////

    export class HomeNoLogCtrl implements IHomeNoLogCtrl {
        private usernameLogin: string = undefined;
        private passwordLogin: string = undefined;

        constructor(public LoginService: ILoginService) {
        }

        public login(): boolean {
            console.log(this.usernameLogin);
            console.log(this.passwordLogin);
            return this.LoginService.login(this.usernameLogin, this.passwordLogin);
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home.nolog', ['app.loginservice'])
        .directive('homeNoLogDirective', () => {
            return {
                templateUrl: '../../views/home/home_no_login.html',
                controller: HomeNoLogCtrl,
                controllerAs: 'homeNoLogCtrl'
            };
        });
}
