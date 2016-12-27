/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 27/12/16.
 */

module app.home.nolog {

    'use strict';

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IHomeNoLogCtrl {
    }

    export interface IHomeNoLogService {

    }

    ///////////////////////////////////////////////////////
    //                     CONTROLLER                    //
    ///////////////////////////////////////////////////////

    export class HomeNoLogCtrl implements IHomeNoLogCtrl {
        constructor(public $scope: ng.IScope) {
        }
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class HomeNoLogService implements IHomeNoLogService {

    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.home.nolog', [])
        .directive('homeNoLogDirective', () => {
            return {
                templateUrl: '../../views/home/home_no_login.html',
                controller: HomeNoLogCtrl,
                controllerAs: 'homeNoLogCtrl'
            };
        })
        .service("homeNoLogService", [() => new app.home.nolog.HomeNoLogService()]);
}
