/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 07/01/17.
 */

module app.search {

    'use strict';
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import ILoginService = app.loginservice.ILoginService;
    import ISettingsService = app.settings.ISettingsService;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface ISearchCtrl {
        longitude: number;
        latitude: number;

        loadingImage: string;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class SearchCtrl implements ISearchCtrl {
        longitude: number;
        latitude: number;

        loadingImage: string = undefined;

        constructor(public StartLoadingService: IStartLoadingService,
                    public LoginService: ILoginService,
                    public NgMap,
                    public SettingsService: ISettingsService) {

            if(!this.StartLoadingService.informationLoaded) {
                console.log('Loading user information...');
            }

            this.longitude = this.StartLoadingService.latitude;
            this.latitude = this.StartLoadingService.longitude;

            this.loadingImage = 'dist/images/s3X06zT.jpg';
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.search', ['app.startloading', 'app.loginservice', 'ngMap', 'angularSpinner', 'app.settings'])
        .config(($routeProvider) => {
            $routeProvider.when('/search', {
                templateUrl: '../../views/testsearchpage/searchpage.html',
                controller: SearchCtrl,
                controllerAs: 'searchCtrl'
            })
        });
}
