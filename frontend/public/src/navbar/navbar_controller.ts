/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 07/01/17.
 */

module app.navbar {

    'use strict';
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import ILoginService = app.loginservice.ILoginService;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface INavbarCtrl {
        username: string;
        activePage: string;

        logout(): void;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class NavbarCtrl implements INavbarCtrl {

        activePage: string = undefined;
        username: string = undefined;

        constructor(public StartLoadingService: IStartLoadingService, public LoginService: ILoginService) {
            this.username = this.StartLoadingService.loggedUserInfo.username;
            this.activePage = window.location.href;
        }

        logout(): void {
            this.LoginService.logout();
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.navbar', ['app.startloading', 'app.loginservice'])
        .directive('navbarDirective', () => {
            return {
                templateUrl: '../../views/navbar/navbar.html',
                controller: NavbarCtrl,
                controllerAs: 'navbarCtrl'
            };
        });
}
