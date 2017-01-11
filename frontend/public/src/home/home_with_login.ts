/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 29/12/16.
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

    export interface IHomeWithLogCtrl {
        loadingImage: string;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class HomeWithLogCtrl implements IHomeWithLogCtrl {

        loadingImage: string = undefined;

        constructor(public LoginService: ILoginService, public StartLoadingService: IStartLoadingService, public $window) {
            if(!this.StartLoadingService.informationLoaded) {
                console.log('Loading user information...');
                this.StartLoadingService.loadUserInfo(LoginService.loggedUser);
            }
            this.loadingImage = 'dist/images/s3X06zT.jpg';
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home.withlog', ['app.loginservice', 'app.startloading', 'angularSpinner'])
        .directive('homeWithLogDirective', () => {
            return {
                templateUrl: '../../views/home/home_with_login.html',
                controller: HomeWithLogCtrl,
                controllerAs: 'homeWithLogCtrl'
            };
        });
}
