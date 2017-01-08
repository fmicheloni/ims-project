/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 07/01/17.
 */

module app.search {

    'use strict';
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import ILoginService = app.loginservice.ILoginService;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface ISearchCtrl {
        longitude: number;
        latitude: number;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class SearchCtrl implements ISearchCtrl {

        longitude: number = 11.334813599999999;
        latitude: number = 46.5037867;

        constructor(public StartLoadingService: IStartLoadingService,
                    public LoginService: ILoginService,
                    public NgMap) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                        this.longitude = position.coords.longitude;
                        this.latitude = position.coords.latitude;
                        console.log(this.longitude);
                        console.log(this.latitude);
                    }
                );
            }
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.search', ['app.startloading', 'app.loginservice', 'ngMap'])
        .config(($routeProvider) => {
            $routeProvider.when('/search', {
                templateUrl: '../../views/testsearchpage/searchpage.html',
                controller: SearchCtrl,
                controllerAs: 'searchCtrl'
            })
        });
}
