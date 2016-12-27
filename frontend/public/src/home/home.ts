/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 27/12/16.
 */

module app.home {

    'use strict';

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IHomeCtrl {
    }

    export interface IHomeService {

    }

    ///////////////////////////////////////////////////////
    //                     CONTROLLER                    //
    ///////////////////////////////////////////////////////

    export class HomeCtrl implements IHomeCtrl {
        isAuthenticated: boolean =  false;

        constructor(public $scope: ng.IScope, public $cookies) {
            this.isAuthenticated = this.checkAuthenticated();
        }

        /**
         * Check whether the auth token is present or not.
         */
        public checkAuthenticated(): boolean {
            let authCookie = this.$cookies.get("Bearer");

            return authCookie != null;
        }
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class HomeService implements IHomeService {

    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home', ['ngRoute', 'ngCookies'])
        .config(($routeProvider) => {
            $routeProvider.when('/', {
                templateUrl: '../../views/home/home.html',
                controller: HomeCtrl,
                controllerAs: 'homeCtrl'
            })
        })
        .service("homeService", [() => new app.home.HomeService()]);
}
