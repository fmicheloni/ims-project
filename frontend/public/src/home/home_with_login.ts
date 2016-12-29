/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 29/12/16.
 */

module app.home.withlog {

    'use strict';
    import ILoginService = app.loginservice.ILoginService;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////

    // export class LoggingUser {
    //     username: string;
    //     password: string;
    //
    //     constructor(username: string, password: string) {
    //         this.username = username;
    //         this.password = password;
    //     }
    // }

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IHomeWithLogCtrl {

    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class HomeWithLogCtrl implements IHomeWithLogCtrl {

        constructor(public LoginService: ILoginService) {
        }

    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home.withlog', ['app.loginservice', 'angularSpinner'])
        .directive('homeWithLogDirective', () => {
            return {
                templateUrl: '../../views/home/home_with_login.html',
                controller: HomeWithLogCtrl,
                controllerAs: 'homeWithLogCtrl'
            };
        });
}
