/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 27/12/16.
 */

module app.account {

    'use strict';
    import LoginService = app.loginservice.LoginService;
    import ILoginService = app.loginservice.ILoginService;
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import CurrentUser = app.startloading.CurrentUser;

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IAccountCtrl {
        loggedUser: CurrentUser;
    }

    ///////////////////////////////////////////////////////
    //                     CONTROLLER                    //
    ///////////////////////////////////////////////////////

    export class AccountCtrl implements IAccountCtrl {
        loggedUser: app.startloading.CurrentUser = undefined;

        constructor(public $scope: ng.IScope,
                    public LoginService: ILoginService,
                    public StartLoadingService: IStartLoadingService) {

            this.loggedUser = StartLoadingService.loggedUserInfo;

        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.account', ['ngRoute', 'app.loginservice', 'app.startloading'])
        .config(($routeProvider) => {
            $routeProvider.when('/account', {
                templateUrl: '../../views/account/account.html',
                controller: AccountCtrl,
                controllerAs: 'accountCtrl'
            })
        });
}
