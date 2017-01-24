/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 07/01/17.
 */

module app.search {

    'use strict';
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import ILoginService = app.loginservice.ILoginService;
    import ISettingsService = app.settings.ISettingsService;
    import IExcursionService = app.excursions.IExcursionService;
    import Excursion = app.excursions.Excursion;

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

        searchString: string;

        excursionsResult: Array<Excursion>;

        searchExcursions(): void;

        isDisplayingResults: boolean;

        goBack(): void;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class SearchCtrl implements ISearchCtrl {
        isDisplayingResults: boolean = false;
        excursionsResult: Array<app.excursions.Excursion> = [];
        searchString: string;
        longitude: number;
        latitude: number;

        loadingImage: string = undefined;

        constructor(public StartLoadingService: IStartLoadingService,
                    public LoginService: ILoginService,
                    public NgMap,
                    public SettingsService: ISettingsService,
                    public ExcursionService: IExcursionService) {

            if(!this.StartLoadingService.informationLoaded) {
                console.log('Loading user information...');
            }

            this.longitude = this.StartLoadingService.latitude;
            this.latitude = this.StartLoadingService.longitude;

            this.loadingImage = 'dist/images/s3X06zT.jpg';
        }

        searchExcursions(): void {
            while(this.excursionsResult.length > 0) {
                this.excursionsResult.pop();
            }

            console.log(this.searchString);

            let foundExcursion: Array<Excursion> = this.ExcursionService.searchExcursions(this.searchString);

            for(let excursion of foundExcursion) {
                console.log(excursion);
                this.excursionsResult.push(excursion);
            }

            this.isDisplayingResults = true;
        }

        goBack(): void {
            this.isDisplayingResults = false;
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.search', ['app.startloading', 'app.loginservice', 'ngMap', 'angularSpinner', 'app.settings', 'app.excursions'])
        .config(($routeProvider) => {
            $routeProvider.when('/search', {
                templateUrl: '../../views/testsearchpage/searchpage.html',
                controller: SearchCtrl,
                controllerAs: 'searchCtrl'
            })
        });
}
