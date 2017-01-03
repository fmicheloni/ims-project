/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 03/01/17.
 */

module app.home.withlog {

    'use strict';
    import ILoginService = app.loginservice.ILoginService;
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import CurrentUser = app.startloading.CurrentUser;

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

    export interface IStartPageCtrl {
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class StartPageCtrl implements IStartPageCtrl {

        constructor(public LoginService: ILoginService, public StartLoadingService: IStartLoadingService, public $window) {

        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home.startpage', ['app.loginservice', 'app.startloading', 'angularSpinner'])
        .directive('startPageDirective', () => {
            return {
                templateUrl: '../../views/startPage/startPage.html',
                controller: StartPageCtrl,
                controllerAs: 'startPageCtrl'
            };
        });
}
