/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 27/12/16.
 */

module app.home {

    'use strict';
    import LoginService = app.loginservice.LoginService;
    import ILoginService = app.loginservice.ILoginService;
    import ISettingsService = app.settings.ISettingsService;

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IHomeCtrl {
    }

    ///////////////////////////////////////////////////////
    //                     CONTROLLER                    //
    ///////////////////////////////////////////////////////

    export class HomeCtrl implements IHomeCtrl {
        constructor(public $scope: ng.IScope,
                    public $cookies,
                    public LoginService: ILoginService,
                    public SettingsService: ISettingsService) {
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home', ['ngRoute', 'ngCookies', 'app.loginservice', 'app.settings'])
        .config(($routeProvider) => {
            $routeProvider.when('/', {
                templateUrl: '../../views/home/home.html',
                controller: HomeCtrl,
                controllerAs: 'homeCtrl'
            })
        });
}
